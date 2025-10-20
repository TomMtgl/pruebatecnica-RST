/*
  Warnings:

  - You are about to drop the column `PrecioUnitario` on the `Producto` table. All the data in the column will be lost.
  - Added the required column `precioUnitario` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "PrecioUnitario",
ADD COLUMN     "precioUnitario" DOUBLE PRECISION NOT NULL;
