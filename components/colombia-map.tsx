
"use client"

import { useEffect, useState } from "react"
import dynamic from 'next/dynamic'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { AfectacionesDepartamento } from "@/types"
import "leaflet/dist/leaflet.css"

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

export default function ColombiaMap({ afectaciones }: ColombiaMapProps) {
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroArea, setFiltroArea] = useState("todos")
  const [geoJsonData, setGeoJsonData] = useState<any>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/campos_petroleros.geojson')
        if (!response.ok) {
          throw new Error('Failed to fetch GeoJSON')
        }
        const data = await response.json()
        // Filter the data based on current filters
        const filteredFeatures = data.features.filter((feature: any) => {
          if (filtroTipo !== "todos" && feature.properties.TIPO_HIDRO !== filtroTipo) {
            return false
          }
          if (filtroEstado !== "todos" && feature.properties.ESTADO_RUTY !== filtroEstado) {
            return false
          }
          if (filtroArea !== "todos") {
            const area = feature.properties.AREA_KM2
            switch (filtroArea) {
              case "pequeño":
                return area < 50
              case "mediano":
                return area >= 50 && area < 200
              case "grande":
                return area >= 200
              default:
                return true
            }
          }
          return true
        })
        setGeoJsonData({
          ...data,
          features: filteredFeatures
        })
      } catch (error) {
        console.error('Error loading GeoJSON:', error)
      }
    }
    getData()
  }, [filtroTipo, filtroEstado, filtroArea]) // Re-run when filters change

  const getColor = (campo: any) => {
    const props = campo.properties
    if (!props) return "#f4f4f5"

    if (props.TIPO_HIDRO === "PETROLEO") return "#2563eb"
    if (props.TIPO_HIDRO === "GAS") return "#16a34a"
    if (props.TIPO_HIDRO === "PETROLEO-GAS") return "#7e22ce"

    return "#f4f4f5"
  }

  const filtrarFeatures = (feature: any) => {
    if (!feature.properties) return false

    if (filtroTipo !== "todos" && feature.properties.TIPO_HIDRO !== filtroTipo) {
      return false
    }

    if (filtroEstado !== "todos" && feature.properties.ESTADO_RUTY !== filtroEstado) {
      return false
    }

    if (filtroArea !== "todos") {
      const area = feature.properties.AREA_KM2
      switch (filtroArea) {
        case "pequeño":
          return area < 50
        case "mediano":
          return area >= 50 && area < 200
        case "grande":
          return area >= 200
        default:
          return true
      }
    }

    return true
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={filtroTipo} onValueChange={setFiltroTipo}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de hidrocarburo" />
          </SelectTrigger>
          <SelectContent className="z-[1000]">
            <SelectItem value="todos">Todos los tipos</SelectItem>
            <SelectItem value="PETROLEO">Petróleo</SelectItem>
            <SelectItem value="GAS">Gas</SelectItem>
            <SelectItem value="PETROLEO-GAS">Petróleo-Gas</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filtroEstado} onValueChange={setFiltroEstado}>
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent className="z-[1000]">
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="VIGENTE">Vigente</SelectItem>
            <SelectItem value="EN TRAMITE">En trámite</SelectItem>
            <SelectItem value="DEROGADA">Derogado</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filtroArea} onValueChange={setFiltroArea}>
          <SelectTrigger>
            <SelectValue placeholder="Área" />
          </SelectTrigger>
          <SelectContent className="z-[1000]">
            <SelectItem value="todos">Todas las áreas</SelectItem>
            <SelectItem value="pequeño">Pequeño (&lt;50 km²)</SelectItem>
            <SelectItem value="mediano">Mediano (50-200 km²)</SelectItem>
            <SelectItem value="grande">Grande (&gt;200 km²)</SelectItem>
          </SelectContent>
        </Select>
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
              data={{
                ...geoJsonData,
                features: geoJsonData.features.filter(filtrarFeatures)
              }}
              style={(feature) => ({
                color: getColor(feature),
                weight: 2,
                fillOpacity: 0.6
              })}
              onEachFeature={(feature, layer) => {
                let popupContent = `
                  <div class="p-2">
                    <h3 class="font-bold">${feature.properties.CAMPO}</h3>
                    <p>Tipo: ${feature.properties.TIPO_HIDRO}</p>
                    <p>Estado: ${feature.properties.ESTADO_RUTY}</p>
                    <p>Área: ${feature.properties.AREA_KM2.toFixed(2)} km²</p>
                  </div>
                `
                layer.bindPopup(popupContent)
              }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  )
}
