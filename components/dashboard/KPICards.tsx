"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Wind, AlertTriangle, AlertCircle } from "lucide-react"
import type { AfectacionesPeriodo } from "@/types"

interface KPICardsProps {
  afectacionHoy: AfectacionesPeriodo
  novedadesAltas: number
  umbralAfectacion: number
  camposConNovedadesConsecutivas: string[]
}

export function KPICards({
  afectacionHoy,
  novedadesAltas,
  umbralAfectacion,
  camposConNovedadesConsecutivas,
}: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-800 flex items-center">
            <Droplet className="h-4 w-4 mr-1 text-blue-600" />
            Total BOPD Afectado Hoy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-800">{afectacionHoy.BOPD.toLocaleString()}</div>
          <p className="text-xs text-blue-600 mt-1">Barriles de Petróleo por Día</p>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-800 flex items-center">
            <Wind className="h-4 w-4 mr-1 text-green-600" />
            Total KPCD Afectado Hoy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-800">{afectacionHoy.KPCD.toLocaleString()}</div>
          <p className="text-xs text-green-600 mt-1">Miles de Pies Cúbicos por Día</p>
        </CardContent>
      </Card>

      <Card className={novedadesAltas > 0 ? "bg-red-50 border-red-200" : "bg-zinc-50 border-zinc-200"}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-red-800 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1 text-red-600" />
            Novedades Críticas Activas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-3xl font-bold ${novedadesAltas > 0 ? "text-red-600" : "text-zinc-600"}`}>
            {novedadesAltas}
          </div>
          <p className="text-xs text-red-600 mt-1">Afectación mayor a {umbralAfectacion}</p>
        </CardContent>
      </Card>

      <Card className="bg-amber-50 border-amber-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-amber-800 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1 text-amber-600" />
            Campos con Alertas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-800">{camposConNovedadesConsecutivas.length}</div>
          <p className="text-xs text-amber-600 mt-1">Novedades consecutivas en menos de 3 días</p>
        </CardContent>
      </Card>
    </div>
  )
}

