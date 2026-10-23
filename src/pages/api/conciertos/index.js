//import * as conciertoService from "../../modules/conciertos/conciertoService.js"; 

import * as conciertoService from "../../../modules/conciertos/conciertoService.js";

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
};

// obtener los conciertos
export async function GET() {
  try {
    const conciertos = await conciertoService.obtenerConciertos();

    return new Response(JSON.stringify(conciertos), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error("Error al obtener los conciertos:", error);

    return new Response(
      JSON.stringify({ error: "No se pudieron obtener los conciertos" }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }
}