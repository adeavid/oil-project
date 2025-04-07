"use client"

import { useEffect, useRef, useState } from "react"
import { Droplet, Wind } from "lucide-react"
import type { AfectacionesDepartamento } from "@/types"

interface ColombiaMapProps {
  afectaciones: Record<string, AfectacionesDepartamento>
}

export default function ColombiaMap({ afectaciones }: ColombiaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
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

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mapRef.current || !mounted) return

    // Limpiar el contenedor antes de renderizar
    mapRef.current.innerHTML = ""

    // Crear el elemento SVG
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "100%")
    svg.setAttribute("viewBox", "0 0 800 1000")
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
    svg.style.display = "block"

    // Escala del mapa
    const scale = 1.2
    const translateX = 100
    const translateY = 100

    // Grupo principal con transformación
    const mainGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
    mainGroup.setAttribute("transform", `translate(${translateX},${translateY}) scale(${scale})`)

    // Encontrar el valor máximo de afectación para escalar los colores
    const maxBOPD = Math.max(...Object.values(afectaciones).map((a) => a.BOPD || 0))
    const maxKPCD = Math.max(...Object.values(afectaciones).map((a) => a.KPCD || 0))

    // Función para obtener el color según la afectación
    const getColor = (departamento: string) => {
      if (!afectaciones[departamento]) return "#E5E7EB"

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

      return "#E5E7EB"
    }

    // Departamentos con coordenadas ajustadas
    const departamentos = [
      {
        id: "AMAZONAS",
        path: "M580,780 L650,750 L720,770 L750,820 L730,880 L670,900 L600,880 L570,830 L580,780 Z",
        nombre: "Amazonas",
      },
      {
        id: "ANTIOQUIA",
        path: "M300,400 L350,380 L390,400 L410,370 L380,340 L410,310 L380,280 L340,290 L310,320 L280,310 L250,340 L280,370 L300,400 Z",
        nombre: "Antioquia",
      },
      {
        id: "ARAUCA",
        path: "M520,290 L570,280 L600,300 L630,280 L600,250 L550,270 L520,290 Z",
        nombre: "Arauca",
      },
      {
        id: "ATLANTICO",
        path: "M270,190 L300,180 L310,210 L280,230 L270,190 Z",
        nombre: "Atlántico",
      },
      {
        id: "BOLIVAR",
        path: "M300,180 L330,190 L340,240 L310,280 L330,330 L300,360 L270,310 L300,270 L280,230 L310,210 L300,180 Z",
        nombre: "Bolívar",
      },
      {
        id: "BOYACA",
        path: "M410,310 L450,300 L480,310 L510,280 L480,270 L450,280 L420,270 L410,310 Z",
        nombre: "Boyacá",
      },
      {
        id: "CALDAS",
        path: "M340,380 L370,370 L400,380 L370,400 L340,380 Z",
        nombre: "Caldas",
      },
      {
        id: "CAQUETA",
        path: "M400,490 L450,510 L490,490 L520,520 L490,550 L450,540 L400,570 L370,540 L400,490 Z",
        nombre: "Caquetá",
      },
      {
        id: "CASANARE",
        path: "M480,310 L520,290 L550,320 L520,350 L480,340 L480,310 Z",
        nombre: "Casanare",
      },
      {
        id: "CAUCA",
        path: "M310,490 L340,460 L370,480 L400,460 L390,430 L340,450 L310,490 Z",
        nombre: "Cauca",
      },
      {
        id: "CESAR",
        path: "M330,190 L360,210 L370,250 L340,280 L330,250 L340,240 L330,190 Z",
        nombre: "Cesar",
      },
      {
        id: "CHOCO",
        path: "M270,370 L240,340 L210,370 L220,420 L250,450 L280,420 L270,370 Z",
        nombre: "Chocó",
      },
      {
        id: "CORDOBA",
        path: "M270,310 L240,280 L250,250 L300,270 L270,310 Z",
        nombre: "Córdoba",
      },
      {
        id: "CUNDINAMARCA",
        path: "M410,310 L420,340 L450,350 L420,370 L400,340 L370,340 L410,310 Z",
        nombre: "Cundinamarca",
      },
      {
        id: "GUAINIA",
        path: "M630,380 L670,370 L720,400 L690,430 L630,420 L630,380 Z",
        nombre: "Guainía",
      },
      {
        id: "GUAVIARE",
        path: "M520,450 L570,430 L600,460 L570,490 L520,480 L520,450 Z",
        nombre: "Guaviare",
      },
      {
        id: "HUILA",
        path: "M390,430 L420,420 L450,430 L430,460 L400,460 L390,430 Z",
        nombre: "Huila",
      },
      {
        id: "LA GUAJIRA",
        path: "M360,210 L390,180 L420,190 L400,220 L360,210 Z",
        nombre: "La Guajira",
      },
      {
        id: "MAGDALENA",
        path: "M300,180 L330,190 L330,250 L300,270 L300,180 Z",
        nombre: "Magdalena",
      },
      {
        id: "META",
        path: "M450,350 L480,340 L520,350 L550,380 L520,410 L480,400 L450,350 Z",
        nombre: "Meta",
      },
      {
        id: "NARIÑO",
        path: "M280,490 L310,490 L340,520 L310,550 L280,520 L280,490 Z",
        nombre: "Nariño",
      },
      {
        id: "NORTE DE SANTANDER",
        path: "M370,250 L400,220 L430,240 L420,270 L370,250 Z",
        nombre: "Norte de Santander",
      },
      {
        id: "PUTUMAYO",
        path: "M340,520 L370,540 L400,520 L370,510 L340,520 Z",
        nombre: "Putumayo",
      },
      {
        id: "QUINDIO",
        path: "M360,400 L370,400 L370,410 L360,410 L360,400 Z",
        nombre: "Quindío",
      },
      {
        id: "RISARALDA",
        path: "M330,400 L360,400 L360,410 L330,410 L330,400 Z",
        nombre: "Risaralda",
      },
      {
        id: "SAN ANDRES Y PROVIDENCIA",
        path: "M120,120 L140,120 L140,140 L120,140 L120,120 Z",
        nombre: "San Andrés y Providencia",
      },
      {
        id: "SANTANDER",
        path: "M370,250 L420,270 L450,280 L420,310 L370,280 L340,280 L370,250 Z",
        nombre: "Santander",
      },
      {
        id: "SUCRE",
        path: "M250,250 L300,270 L270,310 L240,280 L250,250 Z",
        nombre: "Sucre",
      },
      {
        id: "TOLIMA",
        path: "M370,400 L400,380 L420,420 L390,430 L370,400 Z",
        nombre: "Tolima",
      },
      {
        id: "VALLE DEL CAUCA",
        path: "M310,420 L340,420 L340,450 L310,450 L310,420 Z",
        nombre: "Valle del Cauca",
      },
      {
        id: "VAUPES",
        path: "M570,490 L610,480 L640,510 L600,540 L570,490 Z",
        nombre: "Vaupés",
      },
      {
        id: "VICHADA",
        path: "M550,320 L600,310 L640,330 L630,360 L580,370 L550,320 Z",
        nombre: "Vichada",
      },
    ]

    // Renderizar departamentos
    departamentos.forEach((departamento) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      path.setAttribute("d", departamento.path)
      path.setAttribute("fill", getColor(departamento.id))
      path.setAttribute("stroke", "#6B7280")
      path.setAttribute("stroke-width", "1")
      path.setAttribute("vector-effect", "non-scaling-stroke")

      const afectacionBOPD = afectaciones[departamento.id]?.BOPD || 0
      const afectacionKPCD = afectaciones[departamento.id]?.KPCD || 0

      path.addEventListener("mouseover", (e) => {
        path.setAttribute("stroke-width", "2")
        path.setAttribute("stroke", "#1F2937")

        const rect = mapRef.current!.getBoundingClientRect()
        const mouseEvent = e as MouseEvent
        const x = mouseEvent.clientX - rect.left
        const y = mouseEvent.clientY - rect.top

        setTooltipInfo({
          visible: true,
          x,
          y,
          departamento: departamento.nombre,
          BOPD: afectacionBOPD,
          KPCD: afectacionKPCD,
        })
      })

      path.addEventListener("mousemove", (e) => {
        const rect = mapRef.current!.getBoundingClientRect()
        const mouseEvent = e as MouseEvent
        const x = mouseEvent.clientX - rect.left
        const y = mouseEvent.clientY - rect.top

        setTooltipInfo((prev) => ({
          ...prev,
          x,
          y,
        }))
      })

      path.addEventListener("mouseout", () => {
        path.setAttribute("stroke-width", "1")
        path.setAttribute("stroke", "#6B7280")
        setTooltipInfo((prev) => ({
          ...prev,
          visible: false,
        }))
      })

      mainGroup.appendChild(path)
    })

    svg.appendChild(mainGroup)
    mapRef.current.appendChild(svg)
  }, [afectaciones, mounted])

  if (!mounted) {
    return <div className="w-full h-full bg-white rounded-lg animate-pulse" />
  }

  return (
    <div ref={mapRef} className="w-full h-full bg-white rounded-lg relative">
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