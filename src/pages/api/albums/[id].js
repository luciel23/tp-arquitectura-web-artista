import * as albumService from "../../../modules/albumes/albumService.js";

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
};

// Obtener un album por su id
export async function GET({ params }) {
  const { id } = params;

  // Validar que el ID sea un entero positivo
  if (!/^[1-9]\d*$/.test(id)) {
    return new Response(
      JSON.stringify({ error: "El ID debe ser un entero positivo" }),
      {
        status: 400,
        headers: jsonHeaders,
      }
    );
  }

  try {
    const album = await albumService.obtenerAlbumPorId(id);

    if (!album) {
      return new Response(
        JSON.stringify({ error: "Álbum no encontrado" }),
        {
          status: 404,
          headers: jsonHeaders,
        }
      );
    }

    return new Response(JSON.stringify(album), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error(`Error al obtener el álbum con ID ${id}:`, error);

    return new Response(
      JSON.stringify({ error: "No se pudo obtener el álbum" }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }
}