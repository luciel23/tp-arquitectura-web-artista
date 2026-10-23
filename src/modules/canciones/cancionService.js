import * as cancionRepository from "./cancionRepository.js";

export function obtenerCanciones() {
    return cancionRepository.obtenerCanciones();
}

export function obtenerCancionPorId(id) {
    return cancionRepository.obtenerCancionPorId(id);
}