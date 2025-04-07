"use client"

import { useMemo } from "react"
import type {
  Reporte,
  AfectacionesDepartamento,
  AfectacionesCampo,
  AfectacionesOperador,
  AfectacionesPeriodo,
} from "@/types"
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from "date-fns"
import { es } from "date-fns/locale"

export function useAfectaciones(reportes: Reporte[]) {
  // Fechas para filtrado por períodos
  const hoy = new Date()
  const inicioHoy = startOfDay(hoy)
  const finHoy = endOfDay(hoy)

  const inicioSemana = startOfWeek(hoy, { locale: es })
  const finSemana = endOfWeek(hoy, { locale: es })

  const inicioMes = startOfMonth(hoy)
  const finMes = endOfMonth(hoy)

  // Filtrar reportes por período
  const filtrarPorPeriodo = (inicio: Date, fin: Date) => {
    return reportes.filter((reporte) => isWithinInterval(reporte.fecha, { start: inicio, end: fin }))
  }

  const reportesHoy = useMemo(() => filtrarPorPeriodo(inicioHoy, finHoy), [reportes, inicioHoy, finHoy])

  const reportesSemana = useMemo(() => filtrarPorPeriodo(inicioSemana, finSemana), [reportes, inicioSemana, finSemana])

  const reportesMes = useMemo(() => filtrarPorPeriodo(inicioMes, finMes), [reportes, inicioMes, finMes])

  // Calcular afectaciones por período
  const calcularAfectacionPorPeriodo = (reportesFiltrados: Reporte[]): AfectacionesPeriodo => {
    return {
      BOPD: reportesFiltrados.filter((r) => r.unidad === "BOPD").reduce((sum, r) => sum + r.afectacion, 0),
      KPCD: reportesFiltrados.filter((r) => r.unidad === "KPCD").reduce((sum, r) => sum + r.afectacion, 0),
    }
  }

  const afectacionHoy = useMemo(() => calcularAfectacionPorPeriodo(reportesHoy), [reportesHoy])

  const afectacionSemana = useMemo(() => calcularAfectacionPorPeriodo(reportesSemana), [reportesSemana])

  const afectacionMes = useMemo(() => calcularAfectacionPorPeriodo(reportesMes), [reportesMes])

  // Calcular afectaciones por departamento
  const afectacionesPorDepartamento = useMemo(() => {
    return reportes.reduce(
      (acc, reporte) => {
        if (!acc[reporte.departamento]) {
          acc[reporte.departamento] = { BOPD: 0, KPCD: 0 }
        }

        if (reporte.unidad === "BOPD") {
          acc[reporte.departamento].BOPD += reporte.afectacion
        } else if (reporte.unidad === "KPCD") {
          acc[reporte.departamento].KPCD += reporte.afectacion
        }

        return acc
      },
      {} as Record<string, AfectacionesDepartamento>,
    )
  }, [reportes])

  // Calcular afectaciones por campo
  const afectacionesPorCampo = useMemo(() => {
    return reportes.reduce(
      (acc, reporte) => {
        if (!acc[reporte.campo]) {
          acc[reporte.campo] = {
            BOPD: 0,
            KPCD: 0,
            total: 0,
            conteo: 0,
          }
        }

        if (reporte.unidad === "BOPD") {
          acc[reporte.campo].BOPD += reporte.afectacion
        } else if (reporte.unidad === "KPCD") {
          acc[reporte.campo].KPCD += reporte.afectacion
        }

        acc[reporte.campo].total += reporte.afectacion
        acc[reporte.campo].conteo += 1

        return acc
      },
      {} as Record<string, AfectacionesCampo>,
    )
  }, [reportes])

  // Calcular afectaciones por operador
  const afectacionesPorOperador = useMemo(() => {
    return reportes.reduce(
      (acc, reporte) => {
        if (!acc[reporte.operador]) {
          acc[reporte.operador] = {
            BOPD: 0,
            KPCD: 0,
            total: 0,
            campos: new Set(),
          }
        }

        if (reporte.unidad === "BOPD") {
          acc[reporte.operador].BOPD += reporte.afectacion
        } else if (reporte.unidad === "KPCD") {
          acc[reporte.operador].KPCD += reporte.afectacion
        }

        acc[reporte.operador].total += reporte.afectacion
        acc[reporte.operador].campos.add(reporte.campo)

        return acc
      },
      {} as Record<string, AfectacionesOperador>,
    )
  }, [reportes])

  // Calcular estadísticas generales
  const totalAfectacionBOPD = useMemo(
    () => reportes.filter((r) => r.unidad === "BOPD").reduce((sum, r) => sum + r.afectacion, 0),
    [reportes],
  )

  const totalAfectacionKPCD = useMemo(
    () => reportes.filter((r) => r.unidad === "KPCD").reduce((sum, r) => sum + r.afectacion, 0),
    [reportes],
  )

  return {
    reportesHoy,
    reportesSemana,
    reportesMes,
    afectacionHoy,
    afectacionSemana,
    afectacionMes,
    afectacionesPorDepartamento,
    afectacionesPorCampo,
    afectacionesPorOperador,
    totalAfectacionBOPD,
    totalAfectacionKPCD,
  }
}

