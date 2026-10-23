-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_publicacion" TIMESTAMP(3),
    "portada" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cancion" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "duracion" INTEGER,
    "enlaceAudio" TEXT,
    "albumId" INTEGER,

    CONSTRAINT "Cancion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Biografia" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "imagen" TEXT,
    "actualizado" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Biografia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Concierto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "lugar" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Concierto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cancion" ADD CONSTRAINT "Cancion_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
