import * as galeriaService from '../../../modules/galeria/galeriaService.js';

const jsonHeaders= {
    "Content-Type": "application/json"
}
export async function GET({params}) {
  try {
    const galeria = await galeriaService.obtenerGaleriaPorId(params.id);    
    if (!galeria) {
      return new Response(
        JSON.stringify({ error: "No se pudo cargar el archivo" }),
        {
          status: 404,
            headers: jsonHeaders,
        }
      );
    }

    return new Response(JSON.stringify(galeria), {
        status: 200,
        headers: jsonHeaders,
        });
    } catch (error) {
    console.error("Error al obtener el archivo de la galeria:", error);

    return new Response(
      JSON.stringify({ error: "No se pudo obtener el archivo"}),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }
}   