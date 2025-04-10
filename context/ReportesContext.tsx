
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

export function ReportesProvider({ children }: { children: ReactNode }) {
  const [reportes, setReportes] = useState<Reporte[]>([])

  useEffect(() => {
    // Cargar reportes de localStorage
    const reportesGuardados = localStorage.getItem('reportes')
    if (reportesGuardados) {
      const parsed = JSON.parse(reportesGuardados)
      // Convertir strings de fecha a objetos Date
      const reportesConFechas = parsed.map((reporte: any) => ({
        ...reporte,
        fecha: new Date(reporte.fecha),
        fechaReporte: new Date(reporte.fechaReporte),
        fechaAfectacion: new Date(reporte.fechaAfectacion),
        historial: reporte.historial.map((h: any) => ({
          ...h,
          fecha: new Date(h.fecha)
        }))
      }))
      setReportes(reportesConFechas)
    } else {
      // Si no hay datos, usar los ejemplos
      setReportes(reportesEjemplo)
      localStorage.setItem('reportes', JSON.stringify(reportesEjemplo))
    }
  }, [])

  const agregarReporte = (reporte: Reporte) => {
    try {
      const nuevosReportes = [reporte, ...reportes]
      setReportes(nuevosReportes)
      localStorage.setItem('reportes', JSON.stringify(nuevosReportes))
      console.log('✅ Reporte agregado:', reporte)
      console.log('✅ Datos en localStorage:', nuevosReportes)
    } catch (error) {
      console.error("Error agregando reporte:", error)
    }
  }

  const actualizarReporte = (id: number, reporteActualizado: Partial<Reporte>, camposModificados: string[]) => {
    try {
      const nuevoHistorial: HistorialCambio = {
        fecha: new Date(),
        descripcion: "Reporte editado",
        camposModificados,
      }

      const nuevosReportes = reportes.map(r => {
        if (r.id === id) {
          return {
            ...r,
            ...reporteActualizado,
            historial: [...r.historial, nuevoHistorial]
          }
        }
        return r
      })

      setReportes(nuevosReportes)
      localStorage.setItem('reportes', JSON.stringify(nuevosReportes))
      console.log('✅ Reporte actualizado:', id)
      console.log('✅ Datos actualizados:', nuevosReportes)
    } catch (error) {
      console.error("Error actualizando reporte:", error)
    }
  }

  const eliminarReporte = (id: number) => {
    try {
      const nuevosReportes = reportes.filter(r => r.id !== id)
      setReportes(nuevosReportes)
      localStorage.setItem('reportes', JSON.stringify(nuevosReportes))
      console.log('✅ Reporte eliminado')
      console.log('✅ Datos actualizados en localStorage:', nuevosReportes)
    } catch (error) {
      console.error("Error eliminando reporte:", error)
    }
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
