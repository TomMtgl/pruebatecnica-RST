/*
  Warnings:

  - The primary key for the `DetalleFactura` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `detalleFactruaId` on the `DetalleFactura` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DetalleFactura" DROP CONSTRAINT "DetalleFactura_pkey",
DROP COLUMN "detalleFactruaId",
ADD COLUMN     "detalleFacturaId" SERIAL NOT NULL,
ADD CONSTRAINT "DetalleFactura_pkey" PRIMARY KEY ("detalleFacturaId");
