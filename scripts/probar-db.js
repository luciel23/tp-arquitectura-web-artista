import prisma from "../src/lib/prisma.js";

try {
  await prisma.$connect();

  const resultado = await prisma.$queryRaw`SELECT current_database() AS base_de_datos`;

  console.log("Conexión exitosa con PostgreSQL:", resultado);
} catch (error) {
  console.error("Error al conectar con PostgreSQL:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
