"use client"

import { useEffect, useRef, useState } from "react"
import { Droplet, Wind } from "lucide-react"
import type { AfectacionesDepartamento } from "@/types"

interface ColombiaMapProps {
  afectaciones: Record<string, AfectacionesDepartamento>
}

export default function ColombiaMap({ afectaciones }: ColombiaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
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
    if (!mapRef.current) return

    // Limpiar el contenedor antes de renderizar
    mapRef.current.innerHTML = ""

    // Crear el elemento SVG
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "100%")
    svg.setAttribute("viewBox", "0 0 1000 1000")
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
    svg.style.display = "block" // Asegurar que el SVG sea visible

    // Mapa de Colombia con coordenadas más precisas
    const departamentos = [
      {
        id: "AMAZONAS",
        path: "M580,780 L650,750 L720,770 L750,820 L730,880 L670,900 L600,880 L570,830 L580,780",
        nombre: "Amazonas",
      },
      {
        id: "ANTIOQUIA",
        path: "M300,400 L350,380 L390,400 L410,370 L380,340 L410,310 L380,280 L340,290 L310,320 L280,310 L250,340 L280,370 L300,400",
        nombre: "Antioquia",
      },
      {
        id: "ARAUCA",
        path: "M520,290 L570,280 L600,300 L630,280 L600,250 L550,270 L520,290",
        nombre: "Arauca",
      },
      {
        id: "ATLANTICO",
        path: "M270,190 L300,180 L310,210 L280,230 L270,190",
        nombre: "Atlántico",
      },
      {
        id: "BOLIVAR",
        path: "M300,180 L330,190 L340,240 L310,280 L330,330 L300,360 L270,310 L300,270 L280,230 L310,210 L300,180",
        nombre: "Bolívar",
      },
      {
        id: "BOYACA",
        path: "M410,310 L450,300 L480,310 L510,280 L480,270 L450,280 L420,270 L410,310",
        nombre: "Boyacá",
      },
      {
        id: "CALDAS",
        path: "M340,380 L370,370 L400,380 L370,400 L340,380",
        nombre: "Caldas",
      },
      {
        id: "CAQUETA",
        path: "M400,490 L450,510 L490,490 L520,520 L490,550 L450,540 L400,570 L370,540 L400,490",
        nombre: "Caquetá",
      },
      {
        id: "CASANARE",
        path: "M480,310 L520,290 L550,320 L520,350 L480,340 L480,310",
        nombre: "Casanare",
      },
      {
        id: "CAUCA",
        path: "M310,490 L340,460 L370,480 L400,460 L390,430 L340,450 L310,490",
        nombre: "Cauca",
      },
      {
        id: "CESAR",
        path: "M330,190 L360,210 L370,250 L340,280 L330,250 L340,240 L330,190",
        nombre: "Cesar",
      },
      {
        id: "CHOCO",
        path: "M270,370 L240,340 L210,370 L220,420 L250,450 L280,420 L270,370",
        nombre: "Chocó",
      },
      {
        id: "CORDOBA",
        path: "M270,310 L240,280 L250,250 L300,270 L270,310",
        nombre: "Córdoba",
      },
      {
        id: "CUNDINAMARCA",
        path: "M410,310 L420,340 L450,350 L420,370 L400,340 L370,340 L410,310",
        nombre: "Cundinamarca",
      },
      {
        id: "GUAINIA",
        path: "M630,380 L670,370 L720,400 L690,430 L630,420 L630,380",
        nombre: "Guainía",
      },
      {
        id: "GUAVIARE",
        path: "M520,450 L570,430 L600,460 L570,490 L520,480 L520,450",
        nombre: "Guaviare",
      },
      {
        id: "HUILA",
        path: "M390,430 L420,420 L450,430 L430,460 L400,460 L390,430",
        nombre: "Huila",
      },
      {
        id: "LA GUAJIRA",
        path: "M360,210 L390,180 L420,190 L400,220 L360,210",
        nombre: "La Guajira",
      },
      {
        id: "MAGDALENA",
        path: "M300,180 L330,190 L330,250 L300,270 L300,180",
        nombre: "Magdalena",
      },
      {
        id: "META",
        path: "M450,350 L480,340 L520,350 L550,380 L520,410 L480,400 L450,350",
        nombre: "Meta",
      },
      {
        id: "NARIÑO",
        path: "M280,490 L310,490 L340,520 L310,550 L280,520 L280,490",
        nombre: "Nariño",
      },
      {
        id: "NORTE DE SANTANDER",
        path: "M370,250 L400,220 L430,240 L420,270 L370,250",
        nombre: "Norte de Santander",
      },
      {
        id: "PUTUMAYO",
        path: "M340,520 L370,540 L400,520 L370,510 L340,520",
        nombre: "Putumayo",
      },
      {
        id: "QUINDIO",
        path: "M360,400 L370,400 L370,410 L360,410 L360,400",
        nombre: "Quindío",
      },
      {
        id: "RISARALDA",
        path: "M330,400 L360,400 L360,410 L330,410 L330,400",
        nombre: "Risaralda",
      },
      {
        id: "SAN ANDRES Y PROVIDENCIA",
        path: "M120,120 L140,120 L140,140 L120,140 L120,120",
        nombre: "San Andrés y Providencia",
      },
      {
        id: "SANTANDER",
        path: "M370,250 L420,270 L450,280 L420,310 L370,280 L340,280 L370,250",
        nombre: "Santander",
      },
      {
        id: "SUCRE",
        path: "M250,250 L300,270 L270,310 L240,280 L250,250",
        nombre: "Sucre",
      },
      {
        id: "TOLIMA",
        path: "M370,400 L400,380 L420,420 L390,430 L370,400",
        nombre: "Tolima",
      },
      {
        id: "VALLE DEL CAUCA",
        path: "M310,420 L340,420 L340,450 L310,450 L310,420",
        nombre: "Valle del Cauca",
      },
      {
        id: "VAUPES",
        path: "M570,490 L610,480 L640,510 L600,540 L570,490",
        nombre: "Vaupés",
      },
      {
        id: "VICHADA",
        path: "M550,320 L600,310 L640,330 L630,360 L580,370 L550,320",
        nombre: "Vichada",
      },
    ]

    // Encontrar el valor máximo de afectación para escalar los colores
    const maxBOPD = Math.max(...Object.values(afectaciones).map((a) => a.BOPD || 0))
    const maxKPCD = Math.max(...Object.values(afectaciones).map((a) => a.KPCD || 0))

    // Función para obtener el color según la afectación
    const getColor = (departamento: string) => {
      if (!afectaciones[departamento]) return "#E5E7EB" // Gris claro para departamentos sin afectaciones

      const afectacionBOPD = afectaciones[departamento].BOPD || 0
      const afectacionKPCD = afectaciones[departamento].KPCD || 0

      // Si hay afectación de ambos tipos, usamos un color combinado
      if (afectacionBOPD > 0 && afectacionKPCD > 0) {
        return "#9333EA" // Púrpura para combinación
      }

      // Si solo hay afectación de BOPD
      if (afectacionBOPD > 0) {
        const intensidad = afectacionBOPD / maxBOPD
        if (intensidad > 0.7) return "#1E40AF" // Azul intenso
        if (intensidad > 0.4) return "#3B82F6" // Azul medio
        return "#93C5FD" // Azul claro
      }

      // Si solo hay afectación de KPCD
      if (afectacionKPCD > 0) {
        const intensidad = afectacionKPCD / maxKPCD
        if (intensidad > 0.7) return "#166534" // Verde intenso
        if (intensidad > 0.4) return "#22C55E" // Verde medio
        return "#86EFAC" // Verde claro
      }

      return "#E5E7EB" // Gris claro para departamentos sin afectaciones
    }

    // Crear un grupo para los departamentos
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")

    // Agregar título al mapa
    const mapTitle = document.createElementNS("http://www.w3.org/2000/svg", "text")
    mapTitle.setAttribute("x", "500")
    mapTitle.setAttribute("y", "50")
    mapTitle.setAttribute("text-anchor", "middle")
    mapTitle.setAttribute("font-size", "24")
    mapTitle.setAttribute("font-weight", "bold")
    mapTitle.setAttribute("fill", "#1F2937")
    mapTitle.textContent = "Colombia - Afectaciones por Departamento"
    svg.appendChild(mapTitle)

    // Crear un tooltip personalizado
    const tooltip = document.createElement("div")
    tooltip.className = "absolute hidden bg-white p-2 rounded-md shadow-lg border border-gray-200 z-50 text-sm"
    tooltip.style.pointerEvents = "none"
    mapRef.current.appendChild(tooltip)

    // Agregar cada departamento al mapa
    departamentos.forEach((departamento) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      path.setAttribute("d", departamento.path)
      path.setAttribute("fill", getColor(departamento.id))
      path.setAttribute("stroke", "#6B7280")
      path.setAttribute("stroke-width", "1.5")
      path.setAttribute("data-departamento", departamento.nombre)
      path.setAttribute("data-id", departamento.id)

      // Obtener datos de afectación
      const afectacionBOPD = afectaciones[departamento.id]?.BOPD || 0
      const afectacionKPCD = afectaciones[departamento.id]?.KPCD || 0

      // Agregar interactividad
      path.addEventListener("mouseover", (e) => {
        path.setAttribute("stroke-width", "3")
        path.setAttribute("stroke", "#1F2937")

        // Actualizar el estado del tooltip
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
        path.setAttribute("stroke-width", "1.5")
        path.setAttribute("stroke", "#6B7280")
        setTooltipInfo((prev) => ({
          ...prev,
          visible: false,
        }))
      })

      g.appendChild(path)

      // Agregar etiqueta de texto para departamentos con afectaciones
      if (afectacionBOPD > 0 || afectacionKPCD > 0) {
        // Extraer coordenadas del centro aproximado del path
        const coordsStr = departamento.path.split(" ")
        const xCoords = []
        const yCoords = []

        for (let i = 0; i < coordsStr.length; i += 2) {
          if (coordsStr[i].match(/[0-9]/)) {
            xCoords.push(Number.parseInt(coordsStr[i]))
            if (coordsStr[i + 1] && coordsStr[i + 1].match(/[0-9]/)) {
              yCoords.push(Number.parseInt(coordsStr[i + 1]))
            }
          }
        }

        const xCenter = xCoords.reduce((a, b) => a + b, 0) / xCoords.length
        const yCenter = yCoords.reduce((a, b) => a + b, 0) / yCoords.length

        // Crear círculo para marcar el departamento
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("cx", xCenter.toString())
        circle.setAttribute("cy", yCenter.toString())
        circle.setAttribute("r", "8")

        // Color del círculo según el tipo de afectación
        if (afectacionBOPD > 0 && afectacionKPCD > 0) {
          circle.setAttribute("fill", "#9333EA") // Púrpura para combinación
        } else if (afectacionBOPD > 0) {
          circle.setAttribute("fill", "#3B82F6") // Azul para BOPD
        } else {
          circle.setAttribute("fill", "#22C55E") // Verde para KPCD
        }

        circle.setAttribute("stroke", "white")
        circle.setAttribute("stroke-width", "2")

        // Crear texto con el nombre del departamento
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
        text.setAttribute("x", xCenter.toString())
        text.setAttribute("y", (yCenter - 15).toString())
        text.setAttribute("text-anchor", "middle")
        text.setAttribute("font-size", "10")
        text.setAttribute("fill", "#1F2937")
        text.setAttribute("font-weight", "bold")
        text.textContent = departamento.nombre

        g.appendChild(circle)
        g.appendChild(text)
      }
    })

    // Agregar leyenda
    const leyenda = document.createElementNS("http://www.w3.org/2000/svg", "g")
    leyenda.setAttribute("transform", "translate(50, 100)")

    const rectLeyenda = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rectLeyenda.setAttribute("x", "0")
    rectLeyenda.setAttribute("y", "0")
    rectLeyenda.setAttribute("width", "220")
    rectLeyenda.setAttribute("height", "180")
    rectLeyenda.setAttribute("fill", "white")
    rectLeyenda.setAttribute("stroke", "#E5E7EB")
    rectLeyenda.setAttribute("stroke-width", "1")
    rectLeyenda.setAttribute("rx", "5")
    leyenda.appendChild(rectLeyenda)

    const tituloLeyenda = document.createElementNS("http://www.w3.org/2000/svg", "text")
    tituloLeyenda.setAttribute("x", "110")
    tituloLeyenda.setAttribute("y", "25")
    tituloLeyenda.setAttribute("text-anchor", "middle")
    tituloLeyenda.setAttribute("font-size", "14")
    tituloLeyenda.setAttribute("font-weight", "bold")
    tituloLeyenda.textContent = "Nivel de Afectación"
    leyenda.appendChild(tituloLeyenda)

    // Leyenda para BOPD
    const tituloBOPD = document.createElementNS("http://www.w3.org/2000/svg", "text")
    tituloBOPD.setAttribute("x", "20")
    tituloBOPD.setAttribute("y", "50")
    tituloBOPD.setAttribute("font-size", "12")
    tituloBOPD.setAttribute("font-weight", "bold")
    tituloBOPD.textContent = "Petróleo (BOPD)"
    leyenda.appendChild(tituloBOPD)

    const nivelesBOPD = [
      { color: "#1E40AF", texto: "Alta (> 70%)" },
      { color: "#3B82F6", texto: "Media (40-70%)" },
      { color: "#93C5FD", texto: "Baja (< 40%)" },
    ]

    nivelesBOPD.forEach((nivel, i) => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      rect.setAttribute("x", "20")
      rect.setAttribute("y", (i * 20 + 60).toString())
      rect.setAttribute("width", "15")
      rect.setAttribute("height", "15")
      rect.setAttribute("fill", nivel.color)
      rect.setAttribute("stroke", "#6B7280")
      rect.setAttribute("stroke-width", "0.5")

      const texto = document.createElementNS("http://www.w3.org/2000/svg", "text")
      texto.setAttribute("x", "45")
      texto.setAttribute("y", (i * 20 + 72).toString())
      texto.setAttribute("font-size", "11")
      texto.textContent = nivel.texto

      leyenda.appendChild(rect)
      leyenda.appendChild(texto)
    })

    // Leyenda para KPCD
    const tituloKPCD = document.createElementNS("http://www.w3.org/2000/svg", "text")
    tituloKPCD.setAttribute("x", "20")
    tituloKPCD.setAttribute("y", "130")
    tituloKPCD.setAttribute("font-size", "12")
    tituloKPCD.setAttribute("font-weight", "bold")
    tituloKPCD.textContent = "Gas (KPCD)"
    leyenda.appendChild(tituloKPCD)

    const nivelesKPCD = [
      { color: "#166534", texto: "Alta (> 70%)" },
      { color: "#22C55E", texto: "Media (40-70%)" },
      { color: "#86EFAC", texto: "Baja (< 40%)" },
    ]

    nivelesKPCD.forEach((nivel, i) => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      rect.setAttribute("x", "20")
      rect.setAttribute("y", (i * 20 + 140).toString())
      rect.setAttribute("width", "15")
      rect.setAttribute("height", "15")
      rect.setAttribute("fill", nivel.color)
      rect.setAttribute("stroke", "#6B7280")
      rect.setAttribute("stroke-width", "0.5")

      const texto = document.createElementNS("http://www.w3.org/2000/svg", "text")
      texto.setAttribute("x", "45")
      texto.setAttribute("y", (i * 20 + 152).toString())
      texto.setAttribute("font-size", "11")
      texto.textContent = nivel.texto

      leyenda.appendChild(rect)
      leyenda.appendChild(texto)
    })

    // Agregar los elementos al SVG
    svg.appendChild(g)
    svg.appendChild(leyenda)

    // Agregar el SVG al contenedor
    mapRef.current.appendChild(svg)
  }, [afectaciones])

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

