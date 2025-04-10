"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KPICards } from "@/components/dashboard/KPICards"
import { ResumenTab } from "@/components/dashboard/ResumenTab"
import { IndicadoresTab } from "@/components/dashboard/IndicadoresTab"
import { MapaTab } from "@/components/dashboard/MapaTab"
import { TablaTab } from "@/components/dashboard/TablaTab"
import { useReportes } from "@/context/ReportesContext"
import { useAfectaciones } from "@/hooks/useAfectaciones"
import { useAlertasNovedades } from "@/hooks/useAlertasNovedades"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("resumen")
  const [umbralAfectacion, setUmbralAfectacion] = useState(1000)

  const { reportes } = useReportes()
  const {
    afectacionHoy,
    afectacionSemana,
    afectacionMes,
    afectacionesPorDepartamento,
    afectacionesPorCampo,
    afectacionesPorOperador,
    totalAfectacionBOPD,
    totalAfectacionKPCD,
  } = useAfectaciones(reportes)

  const { novedadesAltas, camposConNovedadesConsecutivas, departamentosConAfectacionContinua } = useAlertasNovedades(
    reportes,
    umbralAfectacion,
  )

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-zinc-800">Dashboard de Novedades</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="h-10"
            onClick={() => {
              const XLSX = await import('xlsx');
              
              // Preparar datos para exportar
              const data = reportes.map(reporte => ({
                Fecha: new Date(reporte.fecha).toLocaleDateString(),
                Campo: reporte.campo,
                'Tipo de Novedad': reporte.tipoNovedad,
                Descripción: reporte.descripcion,
                Afectación: reporte.afectacion,
                Unidad: reporte.unidad,
                Operador: reporte.operador,
                Departamento: reporte.departamento,
                Municipio: reporte.municipio,
                'Fecha de Reporte': new Date(reporte.fechaReporte).toLocaleDateString(),
                'Fecha de Afectación': new Date(reporte.fechaAfectacion).toLocaleDateString()
              }));

              // Crear libro de trabajo
              const wb = XLSX.utils.book_new();
              const ws = XLSX.utils.json_to_sheet(data);

              // Ajustar anchos de columna
              const colWidths = [
                { wch: 12 }, // Fecha
                { wch: 20 }, // Campo
                { wch: 20 }, // Tipo de Novedad
                { wch: 50 }, // Descripción
                { wch: 12 }, // Afectación
                { wch: 8 },  // Unidad
                { wch: 30 }, // Operador
                { wch: 20 }, // Departamento
                { wch: 20 }, // Municipio
                { wch: 12 }, // Fecha de Reporte
                { wch: 12 }  // Fecha de Afectación
              ];
              ws['!cols'] = colWidths;

              // Agregar hoja al libro
              XLSX.utils.book_append_sheet(wb, ws, "Reporte de Novedades");

              // Guardar archivo
              XLSX.writeFile(wb, "reporte-novedades.xlsx");
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar a Excel
          </Button>
        </div>
      </div>

      {/* KPIs principales */}
      <KPICards
        afectacionHoy={afectacionHoy}
        novedadesAltas={novedadesAltas}
        umbralAfectacion={umbralAfectacion}
        camposConNovedadesConsecutivas={camposConNovedadesConsecutivas}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="indicadores">Indicadores</TabsTrigger>
          <TabsTrigger value="mapa">Mapa</TabsTrigger>
          <TabsTrigger value="tabla">Tabla</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen">
          <ResumenTab
            reportes={reportes}
            totalNovedades={reportes.length}
            totalAfectacionBOPD={totalAfectacionBOPD}
            totalAfectacionKPCD={totalAfectacionKPCD}
            novedadesAltas={novedadesAltas}
            umbralAfectacion={umbralAfectacion}
            afectacionesPorCampo={afectacionesPorCampo}
            afectacionesPorDepartamento={afectacionesPorDepartamento}
            afectacionesPorOperador={afectacionesPorOperador}
          />
        </TabsContent>

        <TabsContent value="indicadores">
          <IndicadoresTab
            afectacionHoy={afectacionHoy}
            afectacionSemana={afectacionSemana}
            afectacionMes={afectacionMes}
            afectacionesPorCampo={afectacionesPorCampo}
            camposConNovedadesConsecutivas={camposConNovedadesConsecutivas}
            departamentosConAfectacionContinua={departamentosConAfectacionContinua}
          />
        </TabsContent>

        <TabsContent value="mapa">
          <MapaTab afectacionesPorDepartamento={afectacionesPorDepartamento} umbralAfectacion={umbralAfectacion} />
        </TabsContent>

        <TabsContent value="tabla">
          <TablaTab reportes={reportes} umbralAfectacion={umbralAfectacion} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

