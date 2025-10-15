/*
  Warnings:

  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pkey",
DROP COLUMN "id",
ADD COLUMN     "usuarioId" SERIAL NOT NULL,
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usuarioId");

-- CreateTable
CREATE TABLE "Factura" (
    "facturaId" SERIAL NOT NULL,
    "disponible" BOOLEAN NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "nombreFantasia" TEXT NOT NULL,
    "fechaFundacion" TEXT NOT NULL,
    "usID" INTEGER NOT NULL,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("facturaId")
);

-- CreateTable
CREATE TABLE "DetalleFactura" (
    "detalleFactruaId" SERIAL NOT NULL,
    "disponible" BOOLEAN NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "factID" INTEGER NOT NULL,

    CONSTRAINT "DetalleFactura_pkey" PRIMARY KEY ("detalleFactruaId")
);

-- CreateTable
CREATE TABLE "Producto" (
    "ID" SERIAL NOT NULL,
    "disponible" BOOLEAN NOT NULL,
    "nombre" TEXT NOT NULL,
    "PrecioUnitario" DOUBLE PRECISION NOT NULL,
    "descripcion" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_usID_fkey" FOREIGN KEY ("usID") REFERENCES "Usuario"("usuarioId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleFactura" ADD CONSTRAINT "DetalleFactura_factID_fkey" FOREIGN KEY ("factID") REFERENCES "Factura"("facturaId") ON DELETE RESTRICT ON UPDATE CASCADE;
