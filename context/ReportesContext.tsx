
"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Reporte, HistorialCambio } from "@/types"
import { reportesEjemplo } from "@/data/reportesEjemplo"
import { PrismaClient } from '@prisma/client'

// Create Prisma client
const prisma = new PrismaClient()

interface ReportesContextType {
  reportes: Reporte[]
  agregarReporte: (reporte: Reporte) => Promise<void>
  actualizarReporte: (id: number, reporte: Partial<Reporte>, cambios: string[]) => Promise<void>
  eliminarReporte: (id: number) => Promise<void>
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
        // Fallback a localStorage si hay error con la DB
        const reportesGuardados = localStorage.getItem('reportes')
        if (reportesGuardados) {
          const parsed = JSON.parse(reportesGuardados)
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
        }
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
      console.log('✅ Reporte agregado a la base de datos:', nuevoReporte)
    } catch (error) {
      console.error("Error agregando reporte:", error)
      // Fallback a localStorage
      const nuevosReportes = [reporte, ...reportes]
      setReportes(nuevosReportes)
      localStorage.setItem('reportes', JSON.stringify(nuevosReportes))
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
      console.log('✅ Reporte actualizado en la base de datos:', reporteActualizado)
    } catch (error) {
      console.error("Error actualizando reporte:", error)
      // Fallback a localStorage
      const nuevosReportes = reportes.map(r => {
        if (r.id === id) {
          return {
            ...r,
            ...reporteActualizado,
            historial: [...r.historial, {
              fecha: new Date(),
              descripcion: "Reporte editado",
              camposModificados
            }]
          }
        }
        return r
      })
      setReportes(nuevosReportes)
      localStorage.setItem('reportes', JSON.stringify(nuevosReportes))
    }
  }

  const eliminarReporte = async (id: number) => {
    try {
      await prisma.reporte.delete({ where: { id } })
      setReportes(prev => prev.filter(r => r.id !== id))
      console.log('✅ Reporte eliminado de la base de datos')
    } catch (error) {
      console.error("Error eliminando reporte:", error)
      // Fallback a localStorage
      const nuevosReportes = reportes.filter(r => r.id !== id)
      setReportes(nuevosReportes)
      localStorage.setItem('reportes', JSON.stringify(nuevosReportes))
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
