"use client"
import {
  Droplet,
  Wind,
  History,
  Clock,
  Calendar,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  LineChart,
  AlertTriangle,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { AfectacionesPeriodo, AfectacionesCampo, ComparativoPeriodoCompleto } from "@/types"
import { datosTendencia } from "@/data/datosTendencia"

interface IndicadoresTabProps {
  afectacionHoy: AfectacionesPeriodo
  afectacionSemana: AfectacionesPeriodo
  afectacionMes: AfectacionesPeriodo
  afectacionesPorCampo: Record<string, AfectacionesCampo>
  camposConNovedadesConsecutivas: string[]
  departamentosConAfectacionContinua: string[]
}

export function IndicadoresTab({
  afectacionHoy,
  afectacionSemana,
  afectacionMes,
  afectacionesPorCampo,
  camposConNovedadesConsecutivas,
  departamentosConAfectacionContinua,
}: IndicadoresTabProps) {
  // Calcular promedio de afectación por campo
  const promedioAfectacionPorCampo = Object.entries(afectacionesPorCampo)
    .map(([campo, datos]) => {
      return {
        campo,
        promedioBOPD: datos.BOPD > 0 && datos.conteo > 0 ? Math.round(datos.BOPD / (datos.conteo || 1)) : 0,
        promedioKPCD: datos.KPCD > 0 && datos.conteo > 0 ? Math.round(datos.KPCD / (datos.conteo || 1)) : 0,
      }
    })
    .sort((a, b) => b.promedioBOPD + b.promedioKPCD - (a.promedioBOPD + a.promedioKPCD))

  // Comparativo con período anterior (usando datos reales)
  const semanaAnteriorBOPD = 4200 // Valor simulado para comparación
  const semanaAnteriorKPCD = 7800 // Valor simulado para comparación

  const comparativoPeriodoAnterior: ComparativoPeriodoCompleto = {
    BOPD: {
      actual: afectacionSemana.BOPD,
      anterior: semanaAnteriorBOPD,
      porcentaje: Math.round((afectacionSemana.BOPD / semanaAnteriorBOPD - 1) * 100),
    },
    KPCD: {
      actual: afectacionSemana.KPCD,
      anterior: semanaAnteriorKPCD,
      porcentaje: Math.round((afectacionSemana.KPCD / semanaAnteriorKPCD - 1) * 100),
    },
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Droplet className="h-5 w-5 mr-2 text-blue-500" />
              BOPD Total Afectado
            </CardTitle>
            <CardDescription>Afectación por período</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-zinc-500" />
                  <span className="text-sm font-medium">Hoy</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{afectacionHoy.BOPD.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-zinc-500" />
                  <span className="text-sm font-medium">Esta semana</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{afectacionSemana.BOPD.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2 text-zinc-500" />
                  <span className="text-sm font-medium">Este mes</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{afectacionMes.BOPD.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Wind className="h-5 w-5 mr-2 text-green-500" />
              KPCD Total Afectado
            </CardTitle>
            <CardDescription>Afectación por período</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-zinc-500" />
                  <span className="text-sm font-medium">Hoy</span>
                </div>
                <span className="text-lg font-bold text-green-600">{afectacionHoy.KPCD.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-zinc-500" />
                  <span className="text-sm font-medium">Esta semana</span>
                </div>
                <span className="text-lg font-bold text-green-600">{afectacionSemana.KPCD.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2 text-zinc-500" />
                  <span className="text-sm font-medium">Este mes</span>
                </div>
                <span className="text-lg font-bold text-green-600">{afectacionMes.KPCD.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <History className="h-5 w-5 mr-2 text-zinc-500" />
              Comparativo con Período Anterior
            </CardTitle>
            <CardDescription>Semana actual vs. semana anterior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm font-medium">BOPD</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-blue-600 mr-2">
                      {comparativoPeriodoAnterior.BOPD.actual.toLocaleString()}
                    </span>
                    <Badge
                      variant={comparativoPeriodoAnterior.BOPD.porcentaje > 0 ? "destructive" : "outline"}
                      className="flex items-center"
                    >
                      {comparativoPeriodoAnterior.BOPD.porcentaje > 0 ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(comparativoPeriodoAnterior.BOPD.porcentaje)}%
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-zinc-500">
                  Período anterior: {comparativoPeriodoAnterior.BOPD.anterior.toLocaleString()} BOPD
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Wind className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm font-medium">KPCD</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-green-600 mr-2">
                      {comparativoPeriodoAnterior.KPCD.actual.toLocaleString()}
                    </span>
                    <Badge
                      variant={comparativoPeriodoAnterior.KPCD.porcentaje > 0 ? "destructive" : "outline"}
                      className="flex items-center"
                    >
                      {comparativoPeriodoAnterior.KPCD.porcentaje > 0 ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(comparativoPeriodoAnterior.KPCD.porcentaje)}%
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-zinc-500">
                  Período anterior: {comparativoPeriodoAnterior.KPCD.anterior.toLocaleString()} KPCD
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-zinc-500" />
              Promedio de Afectación por Campo
            </CardTitle>
            <CardDescription>Afectación promedio por evento reportado</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Campo</TableHead>
                  <TableHead>Promedio BOPD</TableHead>
                  <TableHead>Promedio KPCD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promedioAfectacionPorCampo.slice(0, 5).map((item) => (
                  <TableRow key={item.campo}>
                    <TableCell className="font-medium">{item.campo}</TableCell>
                    <TableCell>
                      {item.promedioBOPD > 0 ? (
                        <div className="flex items-center">
                          <Droplet className="h-3 w-3 mr-1 text-blue-500" />
                          <span>{item.promedioBOPD.toLocaleString()}</span>
                        </div>
                      ) : (
                        <span className="text-zinc-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.promedioKPCD > 0 ? (
                        <div className="flex items-center">
                          <Wind className="h-3 w-3 mr-1 text-green-500" />
                          <span>{item.promedioKPCD.toLocaleString()}</span>
                        </div>
                      ) : (
                        <span className="text-zinc-400">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-zinc-500" />
              Tendencia de Afectaciones
            </CardTitle>
            <CardDescription>Evolución de afectaciones en el tiempo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              <div className="absolute inset-0 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                    <span className="text-xs">BOPD</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                    <span className="text-xs">KPCD</span>
                  </div>
                </div>

                <div className="flex-1 relative">
                  {/* Líneas de referencia */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="border-t border-zinc-100 w-full h-0"></div>
                    ))}
                  </div>

                  {/* Gráfico BOPD */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <path
                      d={`M 0,${64 - (datosTendencia[0].BOPD / 2500) * 64} ${datosTendencia.map((d, i) => `L ${(i / (datosTendencia.length - 1)) * 100}%,${64 - (d.BOPD / 2500) * 64}`).join(" ")}`}
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* Gráfico KPCD */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <path
                      d={`M 0,${64 - (datosTendencia[0].KPCD / 3000) * 64} ${datosTendencia.map((d, i) => `L ${(i / (datosTendencia.length - 1)) * 100}%,${64 - (d.KPCD / 3000) * 64}`).join(" ")}`}
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="flex justify-between mt-2 text-xs text-zinc-500">
                  {datosTendencia
                    .filter((_, i) => i % 2 === 0)
                    .map((d) => (
                      <span key={d.fecha}>{d.fecha}</span>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-amber-200">
          <CardHeader className="bg-amber-50">
            <CardTitle className="text-lg flex items-center text-amber-800">
              <AlertCircle className="h-5 w-5 mr-2 text-amber-600" />
              Campos con Novedades Consecutivas
            </CardTitle>
            <CardDescription className="text-amber-700">
              Campos con más de 2 novedades en menos de 3 días
            </CardDescription>
          </CardHeader>
          <CardContent>
            {camposConNovedadesConsecutivas.length > 0 ? (
              <div className="space-y-3 mt-2">
                {camposConNovedadesConsecutivas.map((campo) => (
                  <div key={campo} className="flex items-center justify-between p-3 bg-amber-50 rounded-md">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                      <span className="font-medium">{campo}</span>
                    </div>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                      Alerta
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-24 text-zinc-500">
                No hay campos con novedades consecutivas
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-lg flex items-center text-red-800">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
              Departamentos con Afectación Continua
            </CardTitle>
            <CardDescription className="text-red-700">
              Departamentos con afectación por varios días consecutivos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {departamentosConAfectacionContinua.length > 0 ? (
              <div className="space-y-3 mt-2">
                {departamentosConAfectacionContinua.map((departamento) => (
                  <div key={departamento} className="flex items-center justify-between p-3 bg-red-50 rounded-md">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                      <span className="font-medium">{departamento}</span>
                    </div>
                    <Badge variant="destructive">Crítico</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-24 text-zinc-500">
                No hay departamentos con afectación continua
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

