
"use client"

import { useEffect, useState, useCallback } from "react"
import { Droplet, Wind } from "lucide-react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import type { AfectacionesDepartamento } from "@/types"
import { Card, CardContent } from "./ui/card"
import coJson from "@/attached_assets/co.json"

interface ColombiaMapProps {
  afectaciones: Record<string, AfectacionesDepartamento>
}

export default function ColombiaMap({ afectaciones }: ColombiaMapProps) {
  const [selectedDep, setSelectedDep] = useState<{
    departamento: string
    BOPD: number
    KPCD: number
  } | null>(null)
  
  const [position, setPosition] = useState({ coordinates: [-74, 4.5], zoom: 12 })

  const handleZoomIn = useCallback(() => {
    if (position.zoom >= 32) return
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.2 }))
  }, [position.zoom])

  const handleZoomOut = useCallback(() => {
    if (position.zoom <= 4) return
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.2 }))
  }, [position.zoom])

  const handleMoveEnd = useCallback((position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position)
  }, [])

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
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2">
        <div className="relative">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 2300,
              center: [-74, 4.5]
            }}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "100%"
            }}
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates as [number, number]}
              onMoveEnd={handleMoveEnd}
              maxZoom={16}
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
                    onMouseEnter={() => {
                      setSelectedDep({
                        departamento: nombre,
                        BOPD: afectaciones[nombre]?.BOPD || 0,
                        KPCD: afectaciones[nombre]?.KPCD || 0,
                      })
                    }}
                    onMouseLeave={() => {
                      setSelectedDep(null)
                    }}
                  />
                )
              })
            }
          </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          <div className="absolute top-0 right-0 p-2 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-zinc-50 transition-colors"
            >
              +
            </button>
            <button
              onClick={handleZoomOut}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-zinc-50 transition-colors"
            >
              -
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <Card className="h-full">
          <CardContent className="p-6">
            {selectedDep ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-zinc-900">{selectedDep.departamento}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-zinc-500">Afectación BOPD</p>
                      <p className="text-lg font-medium">{selectedDep.BOPD.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-zinc-500">Afectación KPCD</p>
                      <p className="text-lg font-medium">{selectedDep.KPCD.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-500">
                Seleccione un departamento para ver detalles
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
