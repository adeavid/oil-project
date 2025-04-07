
"use client"

import { useEffect, useRef, useState } from "react"
import { Droplet, Wind } from "lucide-react"
import type { AfectacionesDepartamento } from "@/types"

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
        viewBox="0 0 400 500"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0,0)">
          {departamentos.map((depto) => (
            <path
              key={depto.id}
              d={depto.path}
              fill={getColor(depto.id)}
              stroke="#aaa"
              strokeWidth="1"
              onMouseOver={(e) => handleMouseOver(e, depto.nombre)}
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

const departamentos = [
  {
    id: "AMAZONAS",
    path: "M280,420 L340,400 L380,420 L360,460 L300,470 L280,420",
    nombre: "Amazonas"
  },
  {
    id: "ANTIOQUIA",
    path: "M160,200 L200,180 L220,210 L200,230 L170,240 L160,200",
    nombre: "Antioquia"
  },
  {
    id: "ARAUCA",
    path: "M280,180 L320,170 L340,190 L320,210 L280,180",
    nombre: "Arauca"
  },
  {
    id: "ATLANTICO",
    path: "M150,120 L170,110 L180,140 L160,150 L150,120",
    nombre: "Atlántico"
  },
  {
    id: "BOLIVAR",
    path: "M170,110 L200,120 L210,170 L180,200 L200,240 L170,260 L140,220 L170,190 L160,150 L180,140 L170,110",
    nombre: "Bolívar"
  },
  {
    id: "BOYACA",
    path: "M240,200 L270,190 L290,200 L310,180 L290,170 L270,180 L250,170 L240,200",
    nombre: "Boyacá"
  },
  {
    id: "CALDAS",
    path: "M200,260 L220,250 L240,260 L220,280 L200,260",
    nombre: "Caldas"
  },
  {
    id: "CAQUETA",
    path: "M240,340 L280,350 L310,340 L330,360 L310,380 L280,370 L240,390 L220,370 L240,340",
    nombre: "Caquetá"
  },
  {
    id: "CASANARE",
    path: "M290,200 L320,190 L340,210 L320,230 L290,220 L290,200",
    nombre: "Casanare"
  },
  {
    id: "CAUCA",
    path: "M180,340 L200,320 L220,330 L240,320 L230,300 L200,310 L180,340",
    nombre: "Cauca"
  },
  {
    id: "CESAR",
    path: "M200,120 L220,130 L230,160 L210,180 L200,160 L210,170 L200,120",
    nombre: "Cesar"
  },
  {
    id: "CHOCO",
    path: "M140,260 L120,240 L100,260 L110,290 L130,310 L150,290 L140,260",
    nombre: "Chocó"
  },
  {
    id: "CORDOBA",
    path: "M140,220 L120,200 L130,180 L170,190 L140,220",
    nombre: "Córdoba"
  },
  {
    id: "CUNDINAMARCA",
    path: "M240,200 L250,220 L270,230 L250,250 L240,230 L220,230 L240,200",
    nombre: "Cundinamarca"
  },
  {
    id: "GUAINIA",
    path: "M380,260 L410,250 L440,270 L420,290 L380,280 L380,260",
    nombre: "Guainía"
  },
  {
    id: "GUAVIARE",
    path: "M320,310 L350,300 L370,320 L350,340 L320,330 L320,310",
    nombre: "Guaviare"
  },
  {
    id: "HUILA",
    path: "M230,300 L250,290 L270,300 L260,320 L240,320 L230,300",
    nombre: "Huila"
  },
  {
    id: "LA GUAJIRA",
    path: "M220,130 L240,110 L260,120 L250,140 L220,130",
    nombre: "La Guajira"
  },
  {
    id: "MAGDALENA",
    path: "M170,110 L200,120 L200,160 L170,190 L170,110",
    nombre: "Magdalena"
  },
  {
    id: "META",
    path: "M270,230 L290,220 L320,230 L340,250 L320,270 L290,260 L270,230",
    nombre: "Meta"
  },
  {
    id: "NARIÑO",
    path: "M150,340 L180,340 L200,360 L180,380 L150,360 L150,340",
    nombre: "Nariño"
  },
  {
    id: "NORTE DE SANTANDER",
    path: "M230,160 L250,140 L270,150 L250,170 L230,160",
    nombre: "Norte de Santander"
  },
  {
    id: "PUTUMAYO",
    path: "M200,360 L220,370 L240,360 L220,350 L200,360",
    nombre: "Putumayo"
  },
  {
    id: "QUINDIO",
    path: "M220,280 L230,280 L230,290 L220,290 L220,280",
    nombre: "Quindío"
  },
  {
    id: "RISARALDA",
    path: "M200,280 L220,280 L220,290 L200,290 L200,280",
    nombre: "Risaralda"
  },
  {
    id: "SAN ANDRES Y PROVIDENCIA",
    path: "M40,80 L50,80 L50,90 L40,90 L40,80",
    nombre: "San Andrés y Providencia"
  },
  {
    id: "SANTANDER",
    path: "M230,160 L250,170 L270,180 L250,200 L220,180 L210,180 L230,160",
    nombre: "Santander"
  },
  {
    id: "SUCRE",
    path: "M130,180 L170,190 L140,220 L120,200 L130,180",
    nombre: "Sucre"
  },
  {
    id: "TOLIMA",
    path: "M220,280 L240,260 L250,290 L230,300 L220,280",
    nombre: "Tolima"
  },
  {
    id: "VALLE DEL CAUCA",
    path: "M180,290 L200,290 L200,310 L180,310 L180,290",
    nombre: "Valle del Cauca"
  },
  {
    id: "VAUPES",
    path: "M350,340 L380,330 L400,350 L370,370 L350,340",
    nombre: "Vaupés"
  },
  {
    id: "VICHADA",
    path: "M340,210 L370,200 L400,220 L390,240 L360,250 L340,210",
    nombre: "Vichada"
  }
]
