import prisma from "../../lib/prisma.js";

export function obtenerCanciones(){
    return prisma.cancion.findMany({
        orderBy: {
            id: "asc",
        },
    })
}

export function obtenerCancionPorId(id){
    return prisma.cancion.findUnique({
        where: {
            id: Number(id),
        },
    })
}
