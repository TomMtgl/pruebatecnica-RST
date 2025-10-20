/*
  Warnings:

  - The primary key for the `Producto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Producto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."DetalleFactura" DROP CONSTRAINT "DetalleFactura_prodId_fkey";

-- AlterTable
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_pkey",
DROP COLUMN "ID",
ADD COLUMN     "productoId" SERIAL NOT NULL,
ADD CONSTRAINT "Producto_pkey" PRIMARY KEY ("productoId");

-- AddForeignKey
ALTER TABLE "DetalleFactura" ADD CONSTRAINT "DetalleFactura_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Producto"("productoId") ON DELETE RESTRICT ON UPDATE CASCADE;
