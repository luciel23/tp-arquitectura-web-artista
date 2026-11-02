import prisma from "../../lib/prisma.js";

export function obtenerProductos() {
  return prisma.producto.findMany({
    orderBy: {
        nombre: "asc",
    },
    });
}

export function obtenerProductoPorId(id){
    return prisma.producto.findUnique({
        where: {id: Number(id)}
    })
}