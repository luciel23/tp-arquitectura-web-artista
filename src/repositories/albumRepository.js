
import prisma from "../lib/prisma.js";

export function obtenerTodos() {
  return prisma.album.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

export function obtenerPorId(id) {
  return prisma.album.findUnique({
    where: {
      id: Number(id),
    },
  });
}

export function crear(datos) {
  return prisma.album.create({
    data: {
      titulo: datos.titulo,
      descripcion: datos.descripcion,
      fecha_publicacion: datos.fecha_publicacion
        ? new Date(datos.fecha_publicacion)
        : null,
      portada: datos.portada ?? null,
    },
  });
}
