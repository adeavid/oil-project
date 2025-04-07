"use client"

import { useMemo } from "react"
import type { Reporte } from "@/types"
import { differenceInDays } from "date-fns"

export function useAlertasNovedades(reportes: Reporte[], umbralAfectacion: number) {
  // Novedades con alta afectación
  const novedadesAltas = useMemo(
    () => reportes.filter((r) => r.afectacion > umbralAfectacion).length,
    [reportes, umbralAfectacion],
  )

  // Identificar campos con novedades consecutivas
  const camposConNovedadesConsecutivas = useMemo(() => {
    return Object.entries(
      reportes.reduce(
        (acc, reporte) => {
          if (!acc[reporte.campo]) {
            acc[reporte.campo] = {
              fechas: [],
              consecutivas: false,
            }
          }

          acc[reporte.campo].fechas.push(reporte.fecha)

          // Ordenar fechas
          acc[reporte.campo].fechas.sort((a, b) => a.getTime() - b.getTime())

          // Verificar si hay fechas consecutivas (menos de 3 días de diferencia)
          const fechas = acc[reporte.campo].fechas
          for (let i = 1; i < fechas.length; i++) {
            if (differenceInDays(fechas[i], fechas[i - 1]) < 3) {
              acc[reporte.campo].consecutivas = true
              break
            }
          }

          return acc
        },
        {} as Record<string, { fechas: Date[]; consecutivas: boolean }>,
      ),
    )
      .filter(([_, datos]) => datos.consecutivas)
      .map(([campo]) => campo)
  }, [reportes])

  // Identificar departamentos con afectación continua
  const departamentosConAfectacionContinua = useMemo(() => {
    return Object.entries(
      reportes.reduce(
        (acc, reporte) => {
          if (!acc[reporte.departamento]) {
            acc[reporte.departamento] = {
              fechas: [],
              continua: false,
            }
          }

          acc[reporte.departamento].fechas.push(reporte.fecha)

          // Ordenar fechas
          acc[reporte.departamento].fechas.sort((a, b) => a.getTime() - b.getTime())

          // Verificar si hay fechas continuas (al menos 3 días consecutivos)
          const fechas = acc[reporte.departamento].fechas
          if (fechas.length >= 3) {
            for (let i = 2; i < fechas.length; i++) {
              if (
                differenceInDays(fechas[i], fechas[i - 1]) <= 2 &&
                differenceInDays(fechas[i - 1], fechas[i - 2]) <= 2
              ) {
                acc[reporte.departamento].continua = true
                break
              }
            }
          }

          return acc
        },
        {} as Record<string, { fechas: Date[]; continua: boolean }>,
      ),
    )
      .filter(([_, datos]) => datos.continua)
      .map(([departamento]) => departamento)
  }, [reportes])

  return {
    novedadesAltas,
    camposConNovedadesConsecutivas,
    departamentosConAfectacionContinua,
  }
}

