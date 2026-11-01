// service del producto

import * as productoRepository from "./productoRepository.js";

export async function obtenerProductos() {
  return productoRepository.obtenerProductos();
}

export async function obtenerProductoPorId(id) {
  return productoRepository.obtenerProductoPorId(id);
}

// luego buscar diferencias entre async y no async
