/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Factura" DROP CONSTRAINT "Factura_usID_fkey";

-- DropTable
DROP TABLE "public"."Usuario";

-- CreateTable
CREATE TABLE "usuario" (
    "usuarioId" SERIAL NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "estadoCivil" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("usuarioId")
);

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_usID_fkey" FOREIGN KEY ("usID") REFERENCES "usuario"("usuarioId") ON DELETE RESTRICT ON UPDATE CASCADE;
