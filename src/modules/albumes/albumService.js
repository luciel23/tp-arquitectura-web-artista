
// para service, maneja la logica de negocios

import * as albumRepository from "./albumRepository.js";

export function obtenerAlbumes() {
  return albumRepository.obtenerTodos();
}

export function obtenerAlbumPorId(id) {
  return albumRepository.obtenerPorId(id);
}