import prisma from "../../lib/prisma.js";

// como la app no tendria una vista de admin, no son necesarios los metodos de crear, actualizar y eliminar
// solo se necesita obtener la biografia para mostrarla en la vista del artista por ahora.

export function obtenerBiografia() {
  return prisma.biografia.findFirst({
    orderBy: {
      id: "asc",
    },
  });
}
