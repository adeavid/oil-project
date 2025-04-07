
"use client"

import { useEffect, useState } from "react"
import dynamic from 'next/dynamic'
import type { AfectacionesDepartamento } from "@/types"
import "leaflet/dist/leaflet.css"

// Dynamically import Leaflet components with no SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const GeoJSON = dynamic(
  () => import('react-leaflet').then((mod) => mod.GeoJSON),
  { ssr: false }
)

interface ColombiaMapProps {
  afectaciones: Record<string, AfectacionesDepartamento>
}

// Datos de prueba para campos específicos
const camposAfectados = {
  "TIBU": {
    BOPD: 1200,
    KPCD: 0,
    estado: "VIGENTE"
  },
  "SARDINATA": {
    BOPD: 0,
    KPCD: 1500,
    estado: "EN TRAMITE"
  }
}

export default function ColombiaMap({ afectaciones }: ColombiaMapProps) {
  const [geoJsonData, setGeoJsonData] = useState<any>(null)

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/attached_assets/campos_petroleros.geojson')
      const data = await response.json()
      setGeoJsonData(data)
    }
    getData()
  }, [])

  const getColor = (campo: any) => {
    const props = campo.properties
    if (!props) return "#f4f4f5"

    // Color según estado
    switch (props.ESTADO_RUTY) {
      case "VIGENTE":
        return "#2563eb" // Azul
      case "EN TRAMITE":
        return "#16a34a" // Verde
      case "DEROGADA":
        return "#7e22ce" // Morado
      default:
        return "#f4f4f5" // Gris por defecto
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-600" />
          <span>Vigente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-600" />
          <span>En Trámite</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-600" />
          <span>Derogado</span>
        </div>
      </div>

      <div className="h-[600px] w-full relative">
        <MapContainer
          center={[4.5, -73]}
          zoom={6}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© OpenStreetMap contributors'
          />
          {geoJsonData && (
            <GeoJSON
              data={geoJsonData}
              style={(feature) => ({
                color: getColor(feature),
                weight: 2,
                fillOpacity: 0.6
              })}
              onEachFeature={(feature, layer) => {
                const nombre = feature.properties.CAMPO
                const afectacion = camposAfectados[nombre]

                let popupContent = `
                  <div class="p-2">
                    <h3 class="font-bold">${nombre}</h3>
                    <p>Estado: ${feature.properties.ESTADO_RUTY}</p>
                    <p>Tipo: ${feature.properties.TIPO_HIDRO}</p>
                    <p>Área: ${feature.properties.AREA_KM2.toFixed(2)} km²</p>
                `

                if (afectacion) {
                  if (afectacion.BOPD > 0) {
                    popupContent += `<p class="text-red-600 font-bold">Afectación: ${afectacion.BOPD} BOPD</p>`
                  }
                  if (afectacion.KPCD > 0) {
                    popupContent += `<p class="text-red-600 font-bold">Afectación: ${afectacion.KPCD} KPCD</p>`
                  }
                }

                popupContent += `</div>`
                layer.bindPopup(popupContent)
              }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  )
}
