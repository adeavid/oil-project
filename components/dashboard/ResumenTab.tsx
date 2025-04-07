"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar, Building, Map, Activity, BarChart3, Droplet, Wind, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { Reporte, AfectacionesCampo, AfectacionesDepartamento, AfectacionesOperador } from "@/types"

interface ResumenTabProps {
  reportes: Reporte[]
  totalNovedades: number
  totalAfectacionBOPD: number
  totalAfectacionKPCD: number
  novedadesAltas: number
  umbralAfectacion: number
  afectacionesPorCampo: Record<string, AfectacionesCampo>
  afectacionesPorDepartamento: Record<string, AfectacionesDepartamento>
  afectacionesPorOperador: Record<string, AfectacionesOperador>
}

export function ResumenTab({
  reportes,
  totalNovedades,
  totalAfectacionBOPD,
  totalAfectacionKPCD,
  novedadesAltas,
  umbralAfectacion,
  afectacionesPorCampo,
  afectacionesPorDepartamento,
  afectacionesPorOperador,
}: ResumenTabProps) {
  const [diasHistoricos, setDiasHistoricos] = useState(30)

  // Ordenar campos por afectación total (de mayor a menor)
  const camposMasAfectados = Object.entries(afectacionesPorCampo)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 5)

  // Ordenar departamentos por afectación total (de mayor a menor)
  const departamentosMasAfectados = Object.entries(afectacionesPorDepartamento)
    .sort((a, b) => b[1].BOPD + b[1].KPCD - (a[1].BOPD + a[1].KPCD))
    .slice(0, 5)

  // Ordenar operadores por afectación total (de mayor a menor)
  const operadoresMasAfectados = Object.entries(afectacionesPorOperador).sort((a, b) => b[1].total - a[1].total)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-zinc-500" />
              Total Novedades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalNovedades}</div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">Últimos {diasHistoricos} días</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 text-xs">
                    Cambiar
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Seleccionar período</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">7 días</span>
                        <span className="text-sm">90 días</span>
                      </div>
                      <Slider
                        defaultValue={[diasHistoricos]}
                        min={7}
                        max={90}
                        step={1}
                        onValueChange={(value) => setDiasHistoricos(value[0])}
                      />
                      <div className="text-center text-sm font-medium mt-2">{diasHistoricos} días</div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Droplet className="h-4 w-4 mr-1 text-blue-500" />
              Afectación Total (BOPD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalAfectacionBOPD.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
              Barriles de Petróleo por Día
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Wind className="h-4 w-4 mr-1 text-green-500" />
              Afectación Total (KPCD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalAfectacionKPCD.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
              Miles de Pies Cúbicos por Día
            </p>
          </CardContent>
        </Card>

        <Card className={novedadesAltas > 0 ? "bg-red-50" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
              Novedades Críticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${novedadesAltas > 0 ? "text-red-600" : ""}`}>{novedadesAltas}</div>
            <p className="text-xs text-muted-foreground mt-1">Afectación mayor a {umbralAfectacion}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Building className="h-5 w-5 mr-2 text-zinc-500" />
              Campos Más Afectados
            </CardTitle>
            <CardDescription>Top 5 campos con mayor afectación</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[50%]">Campo</TableHead>
                  <TableHead>Afectación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {camposMasAfectados.map(([campo, datos]) => (
                  <TableRow key={campo}>
                    <TableCell className="font-medium">{campo}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {datos.BOPD > 0 && (
                          <div className="flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                            <span className="text-sm">{datos.BOPD.toLocaleString()} BOPD</span>
                          </div>
                        )}
                        {datos.KPCD > 0 && (
                          <div className="flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                            <span className="text-sm">{datos.KPCD.toLocaleString()} KPCD</span>
                          </div>
                        )}
                      </div>
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
              <Map className="h-5 w-5 mr-2 text-zinc-500" />
              Departamentos Más Afectados
            </CardTitle>
            <CardDescription>Top 5 departamentos con mayor afectación</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[50%]">Departamento</TableHead>
                  <TableHead>Afectación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departamentosMasAfectados.map(([departamento, datos]) => (
                  <TableRow key={departamento}>
                    <TableCell className="font-medium">{departamento}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {datos.BOPD > 0 && (
                          <div className="flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                            <span className="text-sm">{datos.BOPD.toLocaleString()} BOPD</span>
                          </div>
                        )}
                        {datos.KPCD > 0 && (
                          <div className="flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                            <span className="text-sm">{datos.KPCD.toLocaleString()} KPCD</span>
                          </div>
                        )}
                      </div>
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
              <Activity className="h-5 w-5 mr-2 text-zinc-500" />
              Operadores Más Afectados
            </CardTitle>
            <CardDescription>Operadores ordenados por afectación</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[50%]">Operador</TableHead>
                  <TableHead>Afectación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {operadoresMasAfectados.map(([operador, datos]) => (
                  <TableRow key={operador}>
                    <TableCell className="font-medium">
                      {operador.includes("COLOMBIA SUCURSAL") ? "CNEOG" : operador}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {datos.BOPD > 0 && (
                          <div className="flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                            <span className="text-sm">{datos.BOPD.toLocaleString()} BOPD</span>
                          </div>
                        )}
                        {datos.KPCD > 0 && (
                          <div className="flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                            <span className="text-sm">{datos.KPCD.toLocaleString()} KPCD</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="text-xs text-zinc-500 pt-2 pb-4">
            Total de campos afectados por operador: {operadoresMasAfectados.map(([_, datos]) => datos.campos.size)}
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Activity className="h-5 w-5 mr-2 text-zinc-500" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>Últimas novedades reportadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportes.slice(0, 5).map((reporte) => (
                <div key={reporte.id} className="flex items-start gap-2 pb-3 border-b border-zinc-100">
                  <div
                    className={`w-2 h-2 mt-1.5 rounded-full ${reporte.afectacion > umbralAfectacion ? "bg-red-500" : reporte.unidad === "BOPD" ? "bg-blue-500" : "bg-green-500"}`}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm">{reporte.campo}</h4>
                      <span className="text-xs text-zinc-500">{format(reporte.fecha, "dd/MM/yyyy")}</span>
                    </div>
                    <p className="text-xs text-zinc-600 mt-0.5">
                      {reporte.tipoNovedad}: {reporte.descripcion}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium">{reporte.afectacion.toLocaleString()}</span>
                      <Badge variant="outline" className="text-xs ml-1">
                        {reporte.unidad === "BOPD" ? (
                          <span className="flex items-center">
                            <Droplet className="h-3 w-3 mr-1 text-blue-500" />
                            BOPD
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Wind className="h-3 w-3 mr-1 text-green-500" />
                            KPCD
                          </span>
                        )}
                      </Badge>
                      <span className="text-xs text-zinc-500 ml-2">• {reporte.departamento}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-zinc-500" />
              Distribución por Tipo
            </CardTitle>
            <CardDescription>Novedades agrupadas por tipo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(
                reportes.reduce(
                  (acc, reporte) => {
                    acc[reporte.tipoNovedad] = (acc[reporte.tipoNovedad] || 0) + 1
                    return acc
                  },
                  {} as Record<string, number>,
                ),
              ).map(([tipo, cantidad]) => (
                <div key={tipo} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-zinc-700 mr-2" />
                    <span className="text-sm">{tipo}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{cantidad}</span>
                    <span className="text-xs text-zinc-500 ml-1">
                      ({Math.round((cantidad / totalNovedades) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

