import * as productoService from '../../../modules/productos/productoService.js';

const jsonHeaders= {
    "Content-Type": "application/json"
}

export async function GET({ params }) {
  const { id } = params;

  // tiene que ser un valor entero
    if (!/^[1-9]\d*$/.test(id)) {
        return new Response(
            JSON.stringify({ error: "El ID debe ser un entero positivo" }),
            {
                status: 400,
                headers: jsonHeaders
            }
        );
    }

  try {
    const producto = await productoService.obtenerProductoPorId(id);

    if (!producto) {
      return new Response(
        JSON.stringify({ error: "Producto no encontrado" }),
        {
          status: 404,
            headers: jsonHeaders,
        }
      );
    }

    return new Response(JSON.stringify(producto), {
        status: 200,
        headers: jsonHeaders,
        });
    } catch (error) {
    console.error("Error al obtener el producto:", error);

    return new Response(
      JSON.stringify({ error: "No se pudo obtener el producto" }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }
}   