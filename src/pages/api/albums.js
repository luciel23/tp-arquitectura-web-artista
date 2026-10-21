

// API de albumes
import * as albumService from "../../services/albumService.js";

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
};

// obtener los todos los albumes
export async function GET() {
  try {
    const albums = await albumService.obtenerAlbumes();

    return new Response(JSON.stringify(albums), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error("Error al obtener los álbumes:", error);

    return new Response(
      JSON.stringify({ error: "No se pudieron obtener los álbumes" }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }
}


// crear un nuevo album
// probando que funcione la conexion con la bbdd
export async function POST({ request }) {
  try {
    let datos;
    try {
      datos = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "El cuerpo debe contener JSON válido" }),
        {
          status: 400,
          headers: jsonHeaders,
        }
      );
    }

    if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
      return new Response(
        JSON.stringify({ error: "El cuerpo debe ser un objeto JSON" }),
        {
          status: 400,
          headers: jsonHeaders,
        }
      );
    }

    if (
      typeof datos.titulo !== "string" ||
      !datos.titulo.trim() ||
      typeof datos.descripcion !== "string" ||
      !datos.descripcion.trim()
    ) {
      return new Response(
        JSON.stringify({
          error: "El título y la descripción son obligatorios",
        }),
        {
          status: 400,
          headers: jsonHeaders,
        }
      );
    }

// crear un albumm: PRUEBA, ya que el sistema no ofrecera un apartado para admins.
// en todo caso se cargaran los datos a traves de un script

    const album = await albumService.crearAlbum(datos);

    return new Response(JSON.stringify(album), {
      status: 201,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error("Error al crear el álbum:", error);

    return new Response(
      JSON.stringify({ error: "No se pudo crear el álbum" }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }
}
