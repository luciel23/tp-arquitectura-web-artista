// utiliza prisma para acceder a la base de datos
import prisma from "../../lib/prisma.js";

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
