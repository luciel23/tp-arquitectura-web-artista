import prisma from "../../lib/prisma.js";

export function obtenerGaleria() {
  return prisma.multimedia.findMany({
    orderBy: {
        titulo: "asc",
    },
    });
}

export function obtenerGaleriaPorId(id){
    return prisma.multimedia.findUnique({
        where: {id: Number(id)}
    })
} 

