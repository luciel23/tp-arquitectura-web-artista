-- CreateEnum
CREATE TYPE "TipoMultimedia" AS ENUM ('IMAGEN', 'VIDEO');

-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(10,2),
    "imagen" TEXT,
    "categoria" TEXT,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Multimedia" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "url" TEXT NOT NULL,
    "tipo" "TipoMultimedia" NOT NULL,

    CONSTRAINT "Multimedia_pkey" PRIMARY KEY ("id")
);
