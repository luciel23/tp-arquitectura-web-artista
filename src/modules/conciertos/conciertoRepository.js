import prisma from "../../lib/prisma.js";

export function obtenerConciertos() {
  return prisma.concierto.findMany({
    orderBy: {
        fecha: "asc",
    },
    });
}

export function obtenerConciertoPorId(id) {
  return prisma.concierto.findUnique({
    where: {
      id: Number(id),
    },
  });
}