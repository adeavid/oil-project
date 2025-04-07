"use client"

import { useEffect, useRef, useState } from "react"
import { Droplet, Wind } from "lucide-react"
import type { AfectacionesDepartamento } from "@/types"
import coJson from "@/attached_assets/co.json"

interface ColombiaMapProps {
  afectaciones: Record<string, AfectacionesDepartamento>
}

export default function ColombiaMap({ afectaciones }: ColombiaMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
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
    if (!afectaciones[departamento]) return "#fff"

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

    return "#fff"
  }

  const handleMouseOver = (e: React.MouseEvent<SVGPathElement>, departamento: string) => {
    const path = e.currentTarget
    path.style.stroke = "#555"
    path.style.strokeWidth = "2"

    const rect = svgRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setTooltipInfo({
      visible: true,
      x,
      y,
      departamento,
      BOPD: afectaciones[departamento]?.BOPD || 0,
      KPCD: afectaciones[departamento]?.KPCD || 0,
    })
  }

  const handleMouseOut = (e: React.MouseEvent<SVGPathElement>) => {
    const path = e.currentTarget
    path.style.stroke = "#aaa"
    path.style.strokeWidth = "1"
    setTooltipInfo(prev => ({ ...prev, visible: false }))
  }

  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setTooltipInfo(prev => ({
      ...prev,
      x,
      y,
    }))
  }

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        viewBox="-80 -10 160 180"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          {coJson.features.map((feature, index) => (
            <path
              key={index}
              d={`M ${feature.geometry.coordinates[0][0].map(coord => coord.join(',')).join(' L ')}`}
              fill={getColor(feature.properties?.nombre || "")}
              stroke="#aaa"
              strokeWidth="1"
              onMouseOver={(e) => handleMouseOver(e, feature.properties?.nombre || "")}
              onMouseOut={handleMouseOut}
              onMouseMove={handleMouseMove}
            />
          ))}
        </g>
      </svg>

      {tooltipInfo.visible && (
        <div
          className="absolute bg-white p-3 rounded-md shadow-lg border border-gray-200 z-50 text-sm"
          style={{
            left: `${tooltipInfo.x + 10}px`,
            top: `${tooltipInfo.y + 10}px`,
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