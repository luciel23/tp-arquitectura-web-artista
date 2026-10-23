import * as conciertoService from "../../../modules/conciertos/conciertoService.js";

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
};

// obtener un concierto por id
export async function GET({ params }) {
  const { id } = params;

  // validamos que sea entero
  if (!/^[1-9]\d*$/.test(id)) {
    return new Response(
        JSON.stringify({ error: "El ID debe ser un entero positivo" }),
        {
            status: 400,
            headers: jsonHeaders
        }
    );}

  try {
    const concierto = await conciertoService.obtenerConciertoPorId(id);

    if (!concierto) {
      return new Response(
        JSON.stringify({ error: "Concierto no encontrado" }),
        {
          status: 404,
          headers: jsonHeaders,
        }
      );
    }

    return new Response(JSON.stringify(concierto), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error("Error al obtener el concierto:", error);

    return new Response(
      JSON.stringify({ error: "No se pudo obtener el concierto" }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }
}