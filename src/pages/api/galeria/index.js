import * as galeriaService from '../../../modules/galeria/galeriaService.js';

const jsonHeaders= {
    "Content-Type": "application/json"
}


export async function GET() {
  try {
    const galeria = await galeriaService.obtenerGaleria();

    return new Response(JSON.stringify(galeria), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error("Error al obtener la galeria:", error);

    return new Response(
      JSON.stringify({ error: "No se pudo cargar la galeria" }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }
}