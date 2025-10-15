/*
  Warnings:

  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."usuario";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "disponible" BOOLEAN NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);
