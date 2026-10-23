import * as biografiaService from "../../modules/biografia/biografiaService.js";


const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
};

// obtener la biografia
export async function GET() {
  try {
    const biografia = await biografiaService.obtenerBiografia();

    return new Response(JSON.stringify(biografia), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error("Error al obtener la biografía:", error);

    return new Response(
      JSON.stringify({ error: "No se pudo obtener la biografía" }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }
}