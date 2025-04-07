"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Check, ChevronsUpDown, Loader2, CalendarIcon, Trash2, Edit, History } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useReportes } from "@/context/ReportesContext"
import { camposPetroleros, datosAutocompletados } from "@/data/camposPetroleros"
import { tiposNovedad, unidades } from "@/data/tiposNovedad"
import type { Reporte } from "@/types"

// Definición del esquema de validación
const formSchema = z.object({
  campo: z.string({
    required_error: "Por favor seleccione un campo petrolero",
  }),
  tipoNovedad: z.string({
    required_error: "Por favor seleccione un tipo de novedad",
  }),
  descripcion: z
    .string()
    .min(10, {
      message: "La descripción debe tener al menos 10 caracteres",
    })
    .max(500, {
      message: "La descripción no puede exceder los 500 caracteres",
    }),
  fechaAfectacion: z
    .date({
      required_error: "Por favor seleccione una fecha",
    })
    .refine((date) => date <= new Date(), { message: "La fecha no puede ser superior a la fecha actual" }),
  unidad: z.string({
    required_error: "Por favor seleccione una unidad",
  }),
  afectacion: z.coerce.number().min(0, {
    message: "La afectación no puede ser negativa",
  }),
})

export default function ReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [campoOpen, setCampoOpen] = useState(false)
  const [campoSeleccionado, setCampoSeleccionado] = useState<string | null>(null)
  const [reporteSeleccionado, setReporteSeleccionado] = useState<Reporte | null>(null)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [historialDialogOpen, setHistorialDialogOpen] = useState(false)
  const { toast } = useToast()
  const { reportes, agregarReporte, actualizarReporte, eliminarReporte } = useReportes()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descripcion: "",
      fechaAfectacion: new Date(),
      afectacion: 0,
    },
  })

  // Función para manejar el envío del formulario
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    setTimeout(() => {
      if (modoEdicion && reporteSeleccionado) {
        // Editar reporte existente
        const cambios: string[] = []

        // Verificar qué campos han cambiado
        if (values.campo !== reporteSeleccionado.campo) cambios.push("Campo")
        if (values.tipoNovedad !== reporteSeleccionado.tipoNovedad) cambios.push("Tipo de Novedad")
        if (values.descripcion !== reporteSeleccionado.descripcion) cambios.push("Descripción")
        if (values.fechaAfectacion.getTime() !== reporteSeleccionado.fechaAfectacion.getTime())
          cambios.push("Fecha de Afectación")
        if (values.unidad !== reporteSeleccionado.unidad) cambios.push("Unidad")
        if (values.afectacion !== reporteSeleccionado.afectacion) cambios.push("Afectación")

        // Actualizar el reporte
        actualizarReporte(reporteSeleccionado.id, values, cambios)

        toast({
          title: "Reporte actualizado con éxito",
          description: "La información ha sido actualizada en el sistema.",
        })

        setModoEdicion(false)
        setReporteSeleccionado(null)
      } else {
        // Crear nuevo reporte
        const nuevoReporte: Reporte = {
          id: Date.now(),
          campo: values.campo,
          tipoNovedad: values.tipoNovedad,
          descripcion: values.descripcion,
          fechaAfectacion: values.fechaAfectacion,
          unidad: values.unidad,
          afectacion: values.afectacion,
          fechaReporte: new Date(),
          fecha: new Date(), // Para compatibilidad con el dashboard
          operador: campoSeleccionado
            ? datosAutocompletados[campoSeleccionado as keyof typeof datosAutocompletados]?.operador
            : "",
          departamento: campoSeleccionado
            ? datosAutocompletados[campoSeleccionado as keyof typeof datosAutocompletados]?.departamento
            : "",
          municipio: campoSeleccionado
            ? datosAutocompletados[campoSeleccionado as keyof typeof datosAutocompletados]?.municipio
            : "",
          historial: [
            {
              fecha: new Date(),
              descripcion: "Reporte creado",
              camposModificados: [],
            },
          ],
        }

        agregarReporte(nuevoReporte)

        toast({
          title: "Novedad reportada con éxito",
          description: "La información ha sido registrada en el sistema.",
        })
      }

      setIsSubmitting(false)
      form.reset({
        descripcion: "",
        fechaAfectacion: new Date(),
        afectacion: 0,
        unidad: "", // Resetear explícitamente el campo de unidad
        campo: "", // Resetear explícitamente el campo
        tipoNovedad: "", // Resetear explícitamente el tipo de novedad
      })
      setCampoSeleccionado(null)
    }, 1500)
  }

  // Función para editar un reporte
  function editarReporte(reporte: Reporte) {
    setReporteSeleccionado(reporte)
    setModoEdicion(true)

    form.reset({
      campo: reporte.campo,
      tipoNovedad: reporte.tipoNovedad,
      descripcion: reporte.descripcion,
      fechaAfectacion: reporte.fechaAfectacion,
      unidad: reporte.unidad,
      afectacion: reporte.afectacion,
    })

    setCampoSeleccionado(reporte.campo)

    // Desplazar hacia el formulario
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Función para cancelar la edición
  function cancelarEdicion() {
    setModoEdicion(false)
    setReporteSeleccionado(null)

    form.reset({
      descripcion: "",
      fechaAfectacion: new Date(),
      afectacion: 0,
      unidad: "", // Resetear explícitamente el campo de unidad
      campo: "", // Resetear explícitamente el campo
      tipoNovedad: "", // Resetear explícitamente el tipo de novedad
    })
    setCampoSeleccionado(null)
  }

  // Función para ver el historial de un reporte
  function verHistorial(reporte: Reporte) {
    setReporteSeleccionado(reporte)
    setHistorialDialogOpen(true)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-zinc-800">
        {modoEdicion ? "Editar Novedad Operativa" : "Reportar Novedad Operativa"}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="campo"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-base">Campo Petrolero</FormLabel>
                  <Popover open={campoOpen} onOpenChange={setCampoOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={campoOpen}
                          className={cn(
                            "w-full justify-between h-12 text-base",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? camposPetroleros.find((campo) => campo.value === field.value)?.label
                            : "Seleccionar campo..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Buscar campo..." />
                        <CommandList>
                          <CommandEmpty>No se encontraron campos.</CommandEmpty>
                          <CommandGroup>
                            {camposPetroleros.map((campo) => (
                              <CommandItem
                                key={campo.value}
                                value={campo.value}
                                onSelect={(value) => {
                                  form.setValue("campo", value)
                                  setCampoSeleccionado(value)
                                  setCampoOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    campo.value === field.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {campo.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipoNovedad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Tipo de Novedad</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Seleccionar tipo..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tiposNovedad.map((tipo) => (
                        <SelectItem key={tipo} value={tipo} className="text-base">
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {campoSeleccionado && (
            <Card className="bg-zinc-100 border-zinc-200">
              <CardContent className="pt-4">
                <h3 className="text-sm font-medium mb-2 text-zinc-500">Información del Campo</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="font-medium text-zinc-500">Contrato:</span>{" "}
                    <span className="text-zinc-800">
                      {datosAutocompletados[campoSeleccionado as keyof typeof datosAutocompletados]?.contrato}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-zinc-500">Operador:</span>{" "}
                    <span className="text-zinc-800">
                      {datosAutocompletados[campoSeleccionado as keyof typeof datosAutocompletados]?.operador}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-zinc-500">Municipio:</span>{" "}
                    <span className="text-zinc-800">
                      {datosAutocompletados[campoSeleccionado as keyof typeof datosAutocompletados]?.municipio}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-zinc-500">Departamento:</span>{" "}
                    <span className="text-zinc-800">
                      {datosAutocompletados[campoSeleccionado as keyof typeof datosAutocompletados]?.departamento}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Descripción Breve</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describa la novedad operativa..."
                    className="resize-none h-24 text-base"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Máximo 500 caracteres</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fechaAfectacion"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-base">Fecha de Afectación</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-12 text-base pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="unidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Unidad</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Seleccionar unidad..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {unidades.map((unidad) => (
                        <SelectItem key={unidad.value} value={unidad.value} className="text-base">
                          {unidad.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="afectacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Afectación en la Producción</FormLabel>
                  <FormControl>
                    <Input type="number" className="h-12 text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" className="h-12 px-8 text-base bg-zinc-800 hover:bg-zinc-700" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {modoEdicion ? "Actualizando..." : "Enviando..."}
                </>
              ) : modoEdicion ? (
                "Actualizar Novedad"
              ) : (
                "Reportar Novedad"
              )}
            </Button>

            {modoEdicion && (
              <Button type="button" variant="outline" className="h-12 px-8 text-base" onClick={cancelarEdicion}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </Form>

      {reportes.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4 text-zinc-800">Reportes Enviados</h3>
          <Card>
            <CardContent className="p-0 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-zinc-100">
                    <TableHead className="font-semibold">Campo</TableHead>
                    <TableHead className="font-semibold">Tipo</TableHead>
                    <TableHead className="font-semibold">Fecha Afectación</TableHead>
                    <TableHead className="font-semibold">Afectación</TableHead>
                    <TableHead className="font-semibold">Fecha Reporte</TableHead>
                    <TableHead className="font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportes.slice(0, 10).map((reporte) => (
                    <TableRow key={reporte.id}>
                      <TableCell className="font-medium">{reporte.campo}</TableCell>
                      <TableCell>{reporte.tipoNovedad}</TableCell>
                      <TableCell>{format(reporte.fechaAfectacion, "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{reporte.afectacion.toLocaleString()}</span>
                          <Badge variant="outline" className="text-xs">
                            {reporte.unidad}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{format(reporte.fechaReporte, "dd/MM/yyyy HH:mm")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => editarReporte(reporte)}
                            title="Editar reporte"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => eliminarReporte(reporte.id)}
                            title="Eliminar reporte"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => verHistorial(reporte)}
                            title="Ver historial de cambios"
                          >
                            <History className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Diálogo para mostrar el historial de cambios */}
      <Dialog open={historialDialogOpen} onOpenChange={setHistorialDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Historial de Cambios</DialogTitle>
            <DialogDescription>Registro de modificaciones realizadas al reporte</DialogDescription>
          </DialogHeader>

          {reporteSeleccionado && (
            <div className="space-y-4">
              <div className="bg-zinc-50 p-3 rounded-md">
                <h4 className="font-medium mb-1">
                  Reporte: {reporteSeleccionado.campo} - {reporteSeleccionado.tipoNovedad}
                </h4>
                <p className="text-sm text-zinc-600">{reporteSeleccionado.descripcion}</p>
              </div>

              <div className="space-y-3">
                {reporteSeleccionado.historial.map((cambio, index) => (
                  <div key={index} className="border-l-2 border-zinc-300 pl-4 py-1">
                    <div className="flex justify-between items-start">
                      <h5 className="font-medium">{cambio.descripcion}</h5>
                      <span className="text-xs text-zinc-500">{format(cambio.fecha, "dd/MM/yyyy HH:mm:ss")}</span>
                    </div>
                    {cambio.camposModificados.length > 0 && (
                      <div className="mt-1">
                        <span className="text-xs text-zinc-600">Campos modificados:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cambio.camposModificados.map((campo, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {campo}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setHistorialDialogOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

