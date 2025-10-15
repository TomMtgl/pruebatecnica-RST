-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "disponible" BOOLEAN NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);
