

// API de albumes
import * as albumService from "../../../modules/albumes/albumService.js";

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