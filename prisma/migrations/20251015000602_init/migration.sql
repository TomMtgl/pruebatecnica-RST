/*
  Warnings:

  - Added the required column `prodId` to the `DetalleFactura` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetalleFactura" ADD COLUMN     "prodId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DetalleFactura" ADD CONSTRAINT "DetalleFactura_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Producto"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
