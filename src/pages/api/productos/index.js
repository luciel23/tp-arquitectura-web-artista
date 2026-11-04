import * as productoService from '../../../modules/productos/productoService.js';


const jsonHeaders= {
    "Content-Type": "application/json"
}
export async function GET() {
  try {
    const productos = await productoService.obtenerProductos();

    return new Response(JSON.stringify(productos), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);

    return new Response(
      JSON.stringify({ error: "No se pudieron obtener los productos" }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }
}