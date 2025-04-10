-- CreateTable
CREATE TABLE "Reporte" (
    "id" SERIAL NOT NULL,
    "campo" TEXT NOT NULL,
    "tipoNovedad" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaAfectacion" TIMESTAMP(3) NOT NULL,
    "unidad" TEXT NOT NULL,
    "afectacion" DOUBLE PRECISION NOT NULL,
    "fechaReporte" TIMESTAMP(3) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "operador" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "historial" JSONB[],

    CONSTRAINT "Reporte_pkey" PRIMARY KEY ("id")
);
