/*
  Warnings:

  - The `fechaFundacion` column on the `Factura` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Factura" DROP COLUMN "fechaFundacion",
ADD COLUMN     "fechaFundacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
