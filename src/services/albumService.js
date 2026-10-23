
// para service, maneja la logica de negocios
import * as albumRepository from "../repositories/albumRepository.js";

export function obtenerAlbumes() {
  return albumRepository.obtenerTodos();
}

export function obtenerAlbumPorId(id) {
  return albumRepository.obtenerPorId(id);
}

export function crearAlbum(datos) {
  if (!datos.titulo?.trim()) {
    throw new Error("El título del álbum es obligatorio!!");
  }

  if (!datos.descripcion?.trim()) {
    throw new Error("La descripción del álbum es obligatoria");
  }

  return albumRepository.crear({
    ...datos,
    titulo: datos.titulo.trim(),
    descripcion: datos.descripcion.trim(),
  });
}
