// importamos

import * as galeriaRepository from './galeriaRepository.js';

export function obtenerGaleria() {
  return galeriaRepository.obtenerGaleria();
}

export function obtenerGaleriaPorId(id) {
  return galeriaRepository.obtenerGaleriaPorId(id);
}

