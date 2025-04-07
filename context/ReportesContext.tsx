"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Reporte, HistorialCambio } from "@/types"
import { reportesEjemplo } from "@/data/reportesEjemplo"

interface ReportesContextType {
  reportes: Reporte[]
  agregarReporte: (reporte: Reporte) => void
  actualizarReporte: (id: number, reporte: Partial<Reporte>, cambios: string[]) => void
  eliminarReporte: (id: number) => void
}

const ReportesContext = createContext<ReportesContextType | undefined>(undefined)

export function ReportesProvider({ children }: { children: ReactNode }) {
  const [reportes, setReportes] = useState<Reporte[]>(reportesEjemplo)

  const agregarReporte = (reporte: Reporte) => {
    setReportes((prevReportes) => [reporte, ...prevReportes])
  }

  const actualizarReporte = (id: number, reporteActualizado: Partial<Reporte>, camposModificados: string[]) => {
    setReportes((prevReportes) =>
      prevReportes.map((reporte) => {
        if (reporte.id === id) {
          // Crear nuevo historial
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

