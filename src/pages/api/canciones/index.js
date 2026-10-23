import * as cancionService from "../../../modules/canciones/cancionService.js";

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
};

// obtener todas las canciones
export async function GET() {
  try {
    const canciones = await cancionService.obtenerCanciones();

    return new Response(JSON.stringify(canciones), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error("Error al obtener las canciones:", error);

    return new Response(
      JSON.stringify({ error: "No se pudieron obtener las canciones" }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }
}   

