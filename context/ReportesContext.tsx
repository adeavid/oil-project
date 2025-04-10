
"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Reporte, HistorialCambio } from "@/types"
import { reportesEjemplo } from "@/data/reportesEjemplo"
import { Storage } from '@google-cloud/storage'

const BUCKET_NAME = process.env.NEXT_PUBLIC_BUCKET_ID || 'default-bucket'
const FILE_NAME = 'reportes.json'

interface ReportesContextType {
  reportes: Reporte[]
  agregarReporte: (reporte: Reporte) => void
  actualizarReporte: (id: number, reporte: Partial<Reporte>, cambios: string[]) => void
  eliminarReporte: (id: number) => void
}

const ReportesContext = createContext<ReportesContextType | undefined>(undefined)

const storage = new Storage()
const bucket = storage.bucket(BUCKET_NAME)

async function guardarReportes(reportes: Reporte[]) {
  try {
    const file = bucket.file(FILE_NAME)
    await file.save(JSON.stringify(reportes, (key, value) => {
      if (value instanceof Date) {
        return value.toISOString()
      }
      return value
    }))
  } catch (error) {
    console.error('Error al guardar reportes:', error)
  }
}

async function cargarReportes(): Promise<Reporte[]> {
  try {
    const file = bucket.file(FILE_NAME)
    const exists = await file.exists()
    
    if (!exists[0]) {
      await guardarReportes(reportesEjemplo)
      return reportesEjemplo
    }

    const [content] = await file.download()
    const reportesData = JSON.parse(content.toString())
    
    return reportesData.map((reporte: any) => ({
      ...reporte,
      fecha: new Date(reporte.fecha),
      fechaReporte: new Date(reporte.fechaReporte),
      fechaAfectacion: new Date(reporte.fechaAfectacion),
      historial: reporte.historial.map((h: any) => ({
        ...h,
        fecha: new Date(h.fecha)
      }))
    }))
  } catch (error) {
    console.error('Error al cargar reportes:', error)
    return reportesEjemplo
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
