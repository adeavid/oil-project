"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Droplet, Wind } from "lucide-react"
import type { AfectacionesDepartamento } from "@/types"
import ColombiaMap from "@/components/colombia-map"

interface MapaTabProps {
  afectacionesPorDepartamento: Record<string, AfectacionesDepartamento>
  umbralAfectacion: number
}

export function MapaTab({ afectacionesPorDepartamento, umbralAfectacion }: MapaTabProps) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-zinc-50 border-b border-zinc-100">
          <CardTitle className="text-lg flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-zinc-500" />
            Mapa de Afectaciones por Departamento
          </CardTitle>
          <CardDescription>Distribución geográfica de afectaciones en la producción</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-[700px] w-full border border-zinc-200 rounded-md overflow-hidden p-4">
            <ColombiaMap afectaciones={afectacionesPorDepartamento} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(afectacionesPorDepartamento)
          .sort(([_, a], [__, b]) => b.BOPD + b.KPCD - (a.BOPD + a.KPCD))
          .map(([departamento, datos]) => (
            <Card
              key={departamento}
              className={datos.BOPD > umbralAfectacion || datos.KPCD > umbralAfectacion ? "bg-red-50" : "bg-zinc-50"}
            >
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-1">{departamento}</h4>
                <div className="space-y-1">
                  {datos.BOPD > 0 && (
                    <div className="flex items-center">
                      <Droplet className="h-3 w-3 mr-1 text-blue-500" />
                      <span
                        className={`text-sm font-bold ${datos.BOPD > umbralAfectacion ? "text-red-600" : "text-zinc-900"}`}
                      >
                        {datos.BOPD.toLocaleString()} BOPD
                      </span>
                    </div>
                  )}
                  {datos.KPCD > 0 && (
                    <div className="flex items-center">
                      <Wind className="h-3 w-3 mr-1 text-green-500" />
                      <span
                        className={`text-sm font-bold ${datos.KPCD > umbralAfectacion ? "text-red-600" : "text-zinc-900"}`}
                      >
                        {datos.KPCD.toLocaleString()} KPCD
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

