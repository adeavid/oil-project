
"use client"

import { useEffect, useState } from "react"
import { Droplet, Wind } from "lucide-react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import type { AfectacionesDepartamento } from "@/types"
import coJson from "@/attached_assets/co.json"

interface ColombiaMapProps {
  afectaciones: Record<string, AfectacionesDepartamento>
}

export default function ColombiaMap({ afectaciones }: ColombiaMapProps) {
  const [tooltipInfo, setTooltipInfo] = useState<{
    visible: boolean
    x: number
    y: number
    departamento: string
    BOPD: number
    KPCD: number
  }>({
    visible: false,
    x: 0,
    y: 0,
    departamento: "",
    BOPD: 0,
    KPCD: 0,
  })

  const getColor = (departamento: string) => {
    if (!afectaciones[departamento]) return "#f4f4f5"

    const maxBOPD = Math.max(...Object.values(afectaciones).map((a) => a.BOPD || 0))
    const maxKPCD = Math.max(...Object.values(afectaciones).map((a) => a.KPCD || 0))

    const afectacionBOPD = afectaciones[departamento].BOPD || 0
    const afectacionKPCD = afectaciones[departamento].KPCD || 0

    if (afectacionBOPD > 0 && afectacionKPCD > 0) {
      return "#9333EA"
    }

    if (afectacionBOPD > 0) {
      const intensidad = afectacionBOPD / maxBOPD
      if (intensidad > 0.7) return "#1E40AF"
      if (intensidad > 0.4) return "#3B82F6"
      return "#93C5FD"
    }

    if (afectacionKPCD > 0) {
      const intensidad = afectacionKPCD / maxKPCD
      if (intensidad > 0.7) return "#166534"
      if (intensidad > 0.4) return "#22C55E"
      return "#86EFAC"
    }

    return "#f4f4f5"
  }

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 2300,
          center: [-74, 4.5],
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Geographies geography={coJson}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const nombre = geo.properties?.name
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getColor(nombre)}
                  stroke="#e4e4e7"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", stroke: "#71717a", strokeWidth: 1 },
                    pressed: { outline: "none" }
                  }}
                  onMouseEnter={(e) => {
                    const path = e.target
                    const rect = path.getBoundingClientRect()
                    const parentRect = path.closest(".relative")?.getBoundingClientRect() || { left: 0, top: 0 }
                    
                    setTooltipInfo({
                      visible: true,
                      x: rect.left - parentRect.left + rect.width/2,
                      y: rect.top - parentRect.top + rect.height/2,
                      departamento: nombre,
                      BOPD: afectaciones[nombre]?.BOPD || 0,
                      KPCD: afectaciones[nombre]?.KPCD || 0,
                    })
                  }}
                  onMouseLeave={() => {
                    setTooltipInfo(prev => ({ ...prev, visible: false }))
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltipInfo.visible && (
        <div
          className="absolute bg-white p-3 rounded-md shadow-lg border border-zinc-200 z-50 text-sm transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${tooltipInfo.x}px`,
            top: `${tooltipInfo.y}px`,
            pointerEvents: "none",
          }}
        >
          <h4 className="font-bold text-zinc-800">{tooltipInfo.departamento}</h4>
          <div className="mt-1 space-y-1">
            {tooltipInfo.BOPD > 0 && (
              <div className="flex items-center">
                <Droplet className="h-4 w-4 mr-1 text-blue-500" />
                <span>{tooltipInfo.BOPD.toLocaleString()} BOPD</span>
              </div>
            )}
            {tooltipInfo.KPCD > 0 && (
              <div className="flex items-center">
                <Wind className="h-4 w-4 mr-1 text-green-500" />
                <span>{tooltipInfo.KPCD.toLocaleString()} KPCD</span>
              </div>
            )}
            {tooltipInfo.BOPD === 0 && tooltipInfo.KPCD === 0 && (
              <div className="text-zinc-500">Sin afectaciones reportadas</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
