"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Reporte, HistorialCambio } from "@/types"
import { reportesEjemplo } from "@/data/reportesEjemplo"

interface ReportesContextType {
  reportes: Reporte[]
  agregarReporte: (reporte: Reporte) => void
  actualizarReporte: (id: number, reporte: Partial<Reporte>, cambios: string[]) => void
  eliminarReporte: (id: number) => void
}

const ReportesContext = createContext<ReportesContextType | undefined>(undefined)

async function guardarReportes(reportes: Reporte[]) {
  try {
    if (!process.env.REPLIT_DB_URL) {
      console.error('REPLIT_DB_URL no está definida');
      return;
    }
    console.log('Guardando en:', process.env.REPLIT_DB_URL);
    const response = await fetch(process.env.REPLIT_DB_URL, {
      method: 'POST',
      body: `reportes=${encodeURIComponent(JSON.stringify(reportes))}`
    });
    if (!response.ok) throw new Error(`Error al guardar reportes: ${response.status}`);
    console.log('Reportes guardados exitosamente');
  } catch (error) {
    console.error('Error al guardar reportes:', error)
  }
}

async function cargarReportes(): Promise<Reporte[]> {
  try {
    if (!process.env.REPLIT_DB_URL) {
      console.error('REPLIT_DB_URL no está definida');
      return reportesEjemplo;
    }
    console.log('Cargando desde:', process.env.REPLIT_DB_URL);
    const response = await fetch(`${process.env.REPLIT_DB_URL}/reportes`);
    if (!response.ok) {
      console.error('Error al cargar reportes:', response.status);
      return reportesEjemplo;
    }

    const data = await response.text();
    if (!data) return reportesEjemplo;

    const reportesData = JSON.parse(data);
    return reportesData.map((reporte: any) => ({
      ...reporte,
      fecha: new Date(reporte.fecha),
      fechaReporte: new Date(reporte.fechaReporte),
      fechaAfectacion: new Date(reporte.fechaAfectacion),
      historial: reporte.historial.map((h: any) => ({
        ...h,
        fecha: new Date(h.fecha)
      }))
    }));
  } catch (error) {
    console.error('Error al cargar reportes:', error);
    return reportesEjemplo;
  }
}

export function ReportesProvider({ children }: { children: ReactNode }) {
  const [reportes, setReportes] = useState<Reporte[]>([])

  useEffect(() => {
    cargarReportes().then(setReportes)
  }, [])

  useEffect(() => {
    if (reportes.length > 0) {
      guardarReportes(reportes)
    }
  }, [reportes])

  const agregarReporte = (reporte: Reporte) => {
    setReportes((prevReportes) => [reporte, ...prevReportes])
  }

  const actualizarReporte = (id: number, reporteActualizado: Partial<Reporte>, camposModificados: string[]) => {
    setReportes((prevReportes) =>
      prevReportes.map((reporte) => {
        if (reporte.id === id) {
          const nuevoHistorial: HistorialCambio = {
            fecha: new Date(),
            descripcion: "Reporte editado",
            camposModificados,
          }

          return {
            ...reporte,
            ...reporteActualizado,
            historial: [...reporte.historial, nuevoHistorial],
          }
        }
        return reporte
      }),
    )
  }

  const eliminarReporte = (id: number) => {
    setReportes((prevReportes) => prevReportes.filter((reporte) => reporte.id !== id))
  }

  return (
    <ReportesContext.Provider value={{ reportes, agregarReporte, actualizarReporte, eliminarReporte }}>
      {children}
    </ReportesContext.Provider>
  )
}

export function useReportes() {
  const context = useContext(ReportesContext)
  if (context === undefined) {
    throw new Error("useReportes debe ser usado dentro de un ReportesProvider")
  }
  return context
}