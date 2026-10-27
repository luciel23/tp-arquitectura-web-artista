
import "dotenv/config";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "csv-parse/sync";
import prisma from "../src/lib/prisma.js";

const carpeta = resolve("prisma/seed");
const aplicar = process.argv.includes("--apply");

const archivos = {
  albumes: {
    nombre: "albumes.csv",
    columnas: ["titulo", "descripcion", "fecha_publicacion", "portada"],
  },
  canciones: {
    nombre: "canciones.csv",
    columnas: ["titulo", "duracion", "enlaceAudio", "album"],
  },
  biografia: {
    nombre: "biografia.csv",
    columnas: ["contenido", "imagen"],
  },
  conciertos: {
    nombre: "conciertos.csv",
    columnas: ["nombre", "lugar", "fecha", "descripcion"],
  },
};

function leerCSV(nombre, columnasEsperadas) {
  const ruta = resolve(carpeta, nombre);

  if (!existsSync(ruta)) {
    console.log(`⏭️  No se encontró ${nombre}; se omite.`);
    return null;
  }

  const contenido = readFileSync(ruta, "utf8");

  const filas = parse(contenido, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  });

  if (filas.length === 0) {
    throw new Error(`${nombre} no contiene filas de datos.`);
  }

  const columnas = Object.keys(filas[0]);

  for (const columna of columnasEsperadas) {
    if (!columnas.includes(columna)) {
      throw new Error(
        `${nombre}: falta la columna obligatoria "${columna}".`
      );
    }
  }

  for (const [indice, fila] of filas.entries()) {
    for (const columna of columnasEsperadas) {
      if (
        !columna.endsWith("Audio") &&
        columna !== "portada" &&
        columna !== "imagen" &&
        columna !== "descripcion" &&
        columna !== "fecha_publicacion" &&
        columna !== "duracion" &&
        !fila[columna]
      ) {
        throw new Error(
          `${nombre}: falta "${columna}" en la fila ${indice + 2}.`
        );
      }
    }
  }

  console.log(`✅ ${nombre}: ${filas.length} fila(s) leída(s).`);
  return filas;
}

function fechaOpcional(valor, campo) {
  if (!valor) return null;

  const fecha = new Date(valor);

  if (Number.isNaN(fecha.getTime())) {
    throw new Error(`Fecha inválida en ${campo}: "${valor}".`);
  }

  return fecha;
}

function urlOpcional(valor, campo) {
  if (!valor) return null;

  let url;

  try {
    url = new URL(valor);
  } catch {
    throw new Error(`URL inválida en ${campo}: "${valor}".`);
  }

  if (url.protocol !== "https:") {
    throw new Error(`${campo} debe utilizar HTTPS.`);
  }

  return valor;
}

function duracionOpcional(valor) {
  if (!valor) return null;

  const duracion = Number(valor);

  if (!Number.isInteger(duracion) || duracion <= 0) {
    throw new Error(
      `Duración inválida: "${valor}". Usá segundos enteros positivos.`
    );
  }

  return duracion;
}

function comprobarDuplicados(filas, clave, archivo) {
  const vistos = new Set();

  for (const fila of filas) {
    const valor = clave(fila);

    if (vistos.has(valor)) {
      throw new Error(
        `${archivo}: hay registros duplicados (${valor}).`
      );
    }

    vistos.add(valor);
  }
}

async function importar() {
  const datos = {};

  for (const [tipo, configuracion] of Object.entries(archivos)) {
    datos[tipo] = leerCSV(
      configuracion.nombre,
      configuracion.columnas
    );
  }

  const disponibles = Object.values(datos).some(
    (filas) => filas !== null
  );

  if (!disponibles) {
    throw new Error(
      `No se encontró ningún CSV en ${carpeta}.`
    );
  }

  const albumes = datos.albumes ?? [];
  const canciones = datos.canciones ?? [];
  const biografias = datos.biografia ?? [];
  const conciertos = datos.conciertos ?? [];

  if (biografias.length > 1) {
    throw new Error(
      "biografia.csv debe contener una sola fila."
    );
  }

  comprobarDuplicados(
    albumes,
    (fila) => fila.titulo.toLowerCase(),
    "albumes.csv"
  );

  comprobarDuplicados(
    canciones,
    (fila) =>
      `${fila.titulo.toLowerCase()}|${(fila.album ?? "").toLowerCase()}`,
    "canciones.csv"
  );

  comprobarDuplicados(
    conciertos,
    (fila) => `${fila.nombre.toLowerCase()}|${fila.fecha}|${fila.lugar.toLowerCase()}`,
    "conciertos.csv"
  );

  // Validar los datos antes de escribir en la base.
  for (const album of albumes) {
    fechaOpcional(album.fecha_publicacion, "fecha_publicacion");
    urlOpcional(album.portada, "portada");
  }

  for (const cancion of canciones) {
    duracionOpcional(cancion.duracion);
    urlOpcional(cancion.enlaceAudio, "enlaceAudio");

    if (!cancion.album) {
      throw new Error(
        `La canción "${cancion.titulo}" debe indicar el álbum en la columna album.`
      );
    }
  }

  for (const concierto of conciertos) {
    if (!concierto.nombre || !concierto.lugar || !concierto.fecha) {
      throw new Error(
        "Cada concierto necesita nombre, lugar y fecha."
      );
    }

    fechaOpcional(concierto.fecha, "fecha del concierto");
  }

  if (biografias[0]) {
    urlOpcional(biografias[0].imagen, "imagen");
  }

  // También permite que las canciones se relacionen con
  // álbumes que ya existen en la base de datos.
  const albumesExistentes = await prisma.album.findMany({
    select: { id: true, titulo: true },
  });

  const albumesPorTitulo = new Map();

  for (const album of albumesExistentes) {
    albumesPorTitulo.set(album.titulo.toLowerCase(), album.id);
  }

  for (const album of albumes) {
    if (!albumesPorTitulo.has(album.titulo.toLowerCase())) {
      // En simulación, el ID definitivo se resolverá al aplicar.
      albumesPorTitulo.set(album.titulo.toLowerCase(), null);
    }
  }

  const titulosEnCSV = new Set(
    albumes.map((album) => album.titulo.toLowerCase())
  );

  for (const cancion of canciones) {
    const tituloAlbum = cancion.album.toLowerCase();

    if (
      !albumesPorTitulo.has(tituloAlbum) &&
      !titulosEnCSV.has(tituloAlbum)
    ) {
      throw new Error(
        `El álbum "${cancion.album}" de la canción "${cancion.titulo}" no existe en la base ni en albumes.csv.`
      );
    }
  }

  const biografiaExistente = biografias.length
    ? await prisma.biografia.findFirst()
    : null;

  console.log("\nResumen de importación:");
  console.log(`- Álbumes: ${albumes.length}`);
  console.log(`- Canciones: ${canciones.length}`);
  console.log(`- Biografía: ${biografias.length}`);
  console.log(`- Conciertos: ${conciertos.length}`);

  if (!aplicar) {
    console.log(
      "\n🧪 SIMULACIÓN: no se modificó la base de datos."
    );

    if (biografiaExistente && biografias.length) {
      console.log(
        "⚠️ Ya existe una biografía en la base; no se reemplazaría."
      );
    }

    console.log(
      "Cuando revises los datos, ejecutá el script con --apply para importar."
    );

    return;
  }

  await prisma.$transaction(async (tx) => {
    // Primero se crean los álbumes que todavía no existen.
    for (const album of albumes) {
      const existente = await tx.album.findFirst({
        where: { titulo: album.titulo },
      });

      if (!existente) {
        const creado = await tx.album.create({
          data: {
            titulo: album.titulo,
            descripcion: album.descripcion,
            fecha_publicacion: fechaOpcional(
              album.fecha_publicacion,
              "fecha_publicacion"
            ),
            portada: urlOpcional(album.portada, "portada"),
          },
        });

        albumesPorTitulo.set(album.titulo.toLowerCase(), creado.id);
        console.log(`➕ Álbum importado: ${album.titulo}`);
      } else {
        albumesPorTitulo.set(album.titulo.toLowerCase(), existente.id);
        console.log(`⏭️ Álbum existente: ${album.titulo}`);
      }
    }

    // Las canciones se asocian mediante albumId.
    for (const cancion of canciones) {
      const albumId = albumesPorTitulo.get(
        cancion.album.toLowerCase()
      );

      if (albumId == null) {
        throw new Error(
          `No se pudo resolver el álbum "${cancion.album}".`
        );
      }

      const existente = await tx.cancion.findFirst({
        where: { titulo: cancion.titulo, albumId },
      });

      if (!existente) {
        await tx.cancion.create({
          data: {
            titulo: cancion.titulo,
            duracion: duracionOpcional(cancion.duracion),
            enlaceAudio: urlOpcional(
              cancion.enlaceAudio,
              "enlaceAudio"
            ),
            albumId,
          },
        });

        console.log(`➕ Canción importada: ${cancion.titulo}`);
      } else {
        console.log(`⏭️ Canción existente: ${cancion.titulo}`);
      }
    }

    // La biografía no se reemplaza si ya hay una.
    if (biografias.length) {
      const existente = await tx.biografia.findFirst();

      if (!existente) {
        await tx.biografia.create({
          data: {
            contenido: biografias[0].contenido,
            imagen: urlOpcional(biografias[0].imagen, "imagen"),
          },
        });

        console.log("➕ Biografía importada.");
      } else {
        console.log("⏭️ Ya existe una biografía; no se reemplazó.");
      }
    }

    for (const concierto of conciertos) {
      const fecha = fechaOpcional(concierto.fecha, "fecha");

      const existente = await tx.concierto.findFirst({
        where: {
          nombre: concierto.nombre,
          lugar: concierto.lugar,
          fecha,
        },
      });

      if (!existente) {
        await tx.concierto.create({
          data: {
            nombre: concierto.nombre,
            lugar: concierto.lugar,
            fecha,
            descripcion: concierto.descripcion || null,
          },
        });

        console.log(`➕ Concierto importado: ${concierto.nombre}`);
      } else {
        console.log(`⏭️ Concierto existente: ${concierto.nombre}`);
      }
    }
  });

  console.log("\n✅ Importación finalizada.");
}

try {
  await importar();
} catch (error) {
  console.error("\n❌ Error:", error.message);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
