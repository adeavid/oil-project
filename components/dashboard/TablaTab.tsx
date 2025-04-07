"use client"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Filter, Search, CalendarIcon, Droplet, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Reporte } from "@/types"
import { camposList } from "@/data/camposPetroleros"
import { operadoresList } from "@/data/operadores"

interface TablaTabProps {
  reportes: Reporte[]
  umbralAfectacion: number
}

export function TablaTab({ reportes, umbralAfectacion }: TablaTabProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [campoFiltro, setCampoFiltro] = useState("todos")
  const [operadorFiltro, setOperadorFiltro] = useState("todos")
  const [busqueda, setBusqueda] = useState("")

  // Filtrar reportes según los criterios seleccionados
  const reportesFiltrados = reportes.filter((reporte) => {
    // Filtro por fecha
    if (date && format(reporte.fecha, "yyyy-MM-dd") !== format(date, "yyyy-MM-dd")) {
      return false
    }

    // Filtro por campo
    if (campoFiltro !== "todos" && reporte.campo !== campoFiltro) {
      return false
    }

    // Filtro por operador
    if (operadorFiltro !== "todos" && reporte.operador !== operadorFiltro) {
      return false
    }

    // Filtro por búsqueda (en descripción o tipo de novedad)
    if (
      busqueda &&
      !reporte.descripcion.toLowerCase().includes(busqueda.toLowerCase()) &&
      !reporte.tipoNovedad.toLowerCase().includes(busqueda.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <div>
      <div className="bg-white rounded-lg border border-zinc-200 p-4 mb-6">
        <h3 className="text-lg font-medium mb-4 flex items-center text-zinc-700">
          <Filter className="mr-2 h-5 w-5" />
          Filtros
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium text-zinc-500 mb-1 block">Fecha</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal h-10", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-500 mb-1 block">Campo</label>
            <Select value={campoFiltro} onValueChange={setCampoFiltro}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Todos los campos" />
              </SelectTrigger>
              <SelectContent>
                {camposList.map((campo) => (
                  <SelectItem key={campo.value} value={campo.value}>
                    {campo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-500 mb-1 block">Operador</label>
            <Select value={operadorFiltro} onValueChange={setOperadorFiltro}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Todos los operadores" />
              </SelectTrigger>
              <SelectContent>
                {operadoresList.map((operador) => (
                  <SelectItem key={operador.value} value={operador.value}>
                    {operador.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-500 mb-1 block">Buscar</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                type="text"
                placeholder="Buscar en descripción..."
                className="pl-8 h-10"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-100">
                <TableHead className="font-semibold">Fecha</TableHead>
                <TableHead className="font-semibold">Campo</TableHead>
                <TableHead className="font-semibold">Tipo de Novedad</TableHead>
                <TableHead className="font-semibold">Descripción</TableHead>
                <TableHead className="font-semibold">Afectación</TableHead>
                <TableHead className="font-semibold">Operador</TableHead>
                <TableHead className="font-semibold">Ubicación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportesFiltrados.length > 0 ? (
                reportesFiltrados.map((reporte) => (
                  <TableRow key={reporte.id}>
                    <TableCell className="font-medium">{format(reporte.fecha, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{reporte.campo}</TableCell>
                    <TableCell>{reporte.tipoNovedad}</TableCell>
                    <TableCell className="max-w-xs truncate">{reporte.descripcion}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "font-medium",
                            reporte.afectacion > umbralAfectacion ? "text-red-600" : "text-zinc-900",
                          )}
                        >
                          {reporte.afectacion.toLocaleString()}
                        </span>
                        <Badge variant="outline" className="text-xs">
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
                        {reporte.afectacion > umbralAfectacion && (
                          <Badge variant="destructive" className="text-xs">
                            Alta
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{reporte.operador}</TableCell>
                    <TableCell>
                      {reporte.departamento} / {reporte.municipio}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No se encontraron resultados para los filtros aplicados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t border-zinc-200 text-sm text-zinc-500">
          Mostrando {reportesFiltrados.length} de {reportes.length} novedades
        </div>
      </div>
    </div>
  )
}

