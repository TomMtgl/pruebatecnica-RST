/*
  Warnings:

  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Factura" DROP CONSTRAINT "Factura_usID_fkey";

-- DropTable
DROP TABLE "public"."usuario";

-- CreateTable
CREATE TABLE "Usuario" (
    "usuarioId" SERIAL NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "estadoCivil" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usuarioId")
);

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_usID_fkey" FOREIGN KEY ("usID") REFERENCES "Usuario"("usuarioId") ON DELETE RESTRICT ON UPDATE CASCADE;
