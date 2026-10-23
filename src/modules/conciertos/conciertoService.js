import * as conciertoRepository from "./conciertoRepository.js";

export function obtenerConciertos() {
  return conciertoRepository.obtenerConciertos();
}

export function obtenerConciertoPorId(id) {
  return conciertoRepository.obtenerConciertoPorId(id);
}
