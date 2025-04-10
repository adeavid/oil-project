
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
    if (typeof window !== 'undefined') {
      const savedReportes = localStorage.getItem('reportes')
      if (savedReportes) {
        const parsed = JSON.parse(savedReportes)
        const reportesData = parsed.map((reporte: any) => ({
          ...reporte,
          fecha: new Date(reporte.fecha),
          fechaReporte: new Date(reporte.fechaReporte),
          fechaAfectacion: new Date(reporte.fechaAfectacion),
          historial: reporte.historial.map((h: any) => ({
            ...h,
            fecha: new Date(h.fecha)
          }))
        }))
        setReportes(reportesData)
      } else {
        setReportes(reportesEjemplo)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && reportes.length > 0) {
      localStorage.setItem('reportes', JSON.stringify(reportes))
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

  // Función de prueba
  const probarBaseDatos = () => {
    // 1. Agregar un nuevo reporte
    const nuevoReporte: Reporte = {
      id: Date.now(),
      campo: "Campo de Prueba",
      tipoNovedad: "Mantenimiento",
      descripcion: "Reporte de prueba",
      fechaAfectacion: new Date(),
      unidad: "BOPD",
      afectacion: 100,
      fechaReporte: new Date(),
      fecha: new Date(),
      operador: "Operador de Prueba",
      departamento: "Departamento de Prueba",
      municipio: "Municipio de Prueba",
      historial: [
        {
          fecha: new Date(),
          descripcion: "Reporte de prueba creado",
          camposModificados: [],
        },
      ],
    }
    
    agregarReporte(nuevoReporte)
    console.log("✅ Reporte agregado:", nuevoReporte)
    
    // 2. Verificar que se guardó en localStorage
    const datosGuardados = localStorage.getItem('reportes')
    console.log("✅ Datos en localStorage:", datosGuardados ? JSON.parse(datosGuardados) : null)
    
    // 3. Eliminar el reporte de prueba
    eliminarReporte(nuevoReporte.id)
    console.log("✅ Reporte eliminado")
    
    // 4. Verificar que se actualizó localStorage
    const datosActualizados = localStorage.getItem('reportes')
    console.log("✅ Datos actualizados en localStorage:", datosActualizados ? JSON.parse(datosActualizados) : null)
  }

  // Ejecutar prueba al cargar
  useEffect(() => {
    probarBaseDatos()
  }, [])

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
