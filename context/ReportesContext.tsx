"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Reporte, HistorialCambio } from "@/types"
import { reportesEjemplo } from "@/data/reportesEjemplo"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
    async function cargarReportes() {
      try {
        const reportesDB = await prisma.reporte.findMany({
          orderBy: { fecha: 'desc' }
        })
        if (reportesDB.length === 0) {
          // Inicializar con datos de ejemplo si no hay datos
          await prisma.reporte.createMany({
            data: reportesEjemplo
          })
          setReportes(reportesEjemplo)
        } else {
          setReportes(reportesDB as Reporte[])
        }
      } catch (error) {
        console.error("Error cargando reportes:", error)
      }
    }
    cargarReportes()
  }, [])

  const agregarReporte = async (reporte: Reporte) => {
    try {
      const nuevoReporte = await prisma.reporte.create({
        data: reporte
      })
      setReportes(prev => [nuevoReporte as Reporte, ...prev])
    } catch (error) {
      console.error("Error agregando reporte:", error)
    }
  }

  const actualizarReporte = async (id: number, reporteActualizado: Partial<Reporte>, camposModificados: string[]) => {
    try {
      const reporte = await prisma.reporte.findUnique({ where: { id } })
      if (!reporte) return

      const nuevoHistorial: HistorialCambio = {
        fecha: new Date(),
        descripcion: "Reporte editado",
        camposModificados,
      }

      const reporteActualizado = await prisma.reporte.update({
        where: { id },
        data: {
          ...reporteActualizado,
          historial: [...reporte.historial, nuevoHistorial]
        }
      })

      setReportes(prev => prev.map(r => r.id === id ? reporteActualizado as Reporte : r))
    } catch (error) {
      console.error("Error actualizando reporte:", error)
    }
  }

  const eliminarReporte = async (id: number) => {
    try {
      await prisma.reporte.delete({ where: { id } })
      setReportes(prev => prev.filter(r => r.id !== id))
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