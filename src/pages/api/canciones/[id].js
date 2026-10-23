import * as cancionService from "../../../modules/canciones/cancionService.js";

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
};

// obtener cancion por el id
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
    const cancion = await cancionService.obtenerCancionPorId(id);

    if (!cancion) {
      return new Response(
        JSON.stringify({ error: "Canción no encontrada" }),
        {
          status: 404,
          headers: jsonHeaders,
        }
      );
    }
    
    return new Response(JSON.stringify(cancion), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error(`Error al obtener la canción con ID ${id}:`, error);

    return new Response(
      JSON.stringify({ error: "No se pudo obtener la canción" }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }
}