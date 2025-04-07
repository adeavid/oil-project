
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
  const [filteredGeoJsonData, setFilteredGeoJsonData] = useState<any>(null)

  // Test data for TIBU and SARDINATA
  const testFields = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          CAMPO: "TIBU",
          TIPO_HIDRO: "PETROLEO",
          ESTADO: "VIGENTE",
          AREA_KM2: 75,
          AFECTACION: 100,
          UNIDAD: "BOPD"
        },
        geometry: {
          type: "Point",
          coordinates: [-72.7358, 8.6489]
        }
      },
      {
        type: "Feature",
        properties: {
          CAMPO: "SARDINATA",
          TIPO_HIDRO: "PETROLEO",
          ESTADO: "EN TRAMITE",
          AREA_KM2: 60,
          AFECTACION: 100,
          UNIDAD: "BOPD"
        },
        geometry: {
          type: "Point",
          coordinates: [-72.8042, 8.5833]
        }
      }
    ]
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/campos_petroleros.geojson')
        const data = await response.json()
        const combinedData = {
          type: "FeatureCollection",
          features: [...data.features, ...testFields.features]
        }
        setGeoJsonData(combinedData)
        setFilteredGeoJsonData(combinedData)
      } catch (error) {
        console.error('Error loading GeoJSON:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!geoJsonData) return

    const filtered = {
      ...geoJsonData,
      features: geoJsonData.features.filter((feature: any) => {
        const props = feature.properties

        if (filtroTipo !== "todos" && props.TIPO_HIDRO !== filtroTipo) {
          return false
        }

        if (filtroEstado !== "todos" && props.ESTADO !== filtroEstado) {
          return false
        }

        if (filtroArea !== "todos") {
          const area = props.AREA_KM2
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
    }

    setFilteredGeoJsonData(filtered)
  }, [geoJsonData, filtroTipo, filtroEstado, filtroArea])

  const getColor = (feature: any) => {
    const props = feature.properties
    if (!props) return "#f4f4f5"

    if (props.TIPO_HIDRO === "PETROLEO") return "#2563eb"
    if (props.TIPO_HIDRO === "GAS") return "#16a34a"
    if (props.TIPO_HIDRO === "PETROLEO-GAS") return "#7e22ce"

    return "#f4f4f5"
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
          key={JSON.stringify([filtroTipo, filtroEstado, filtroArea])}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© OpenStreetMap contributors'
          />
          {filteredGeoJsonData && (
            <GeoJSON
              data={filteredGeoJsonData}
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
                    <p>Estado: ${feature.properties.ESTADO}</p>
                    <p>Área: ${feature.properties.AREA_KM2.toFixed(2)} km²</p>
                    ${feature.properties.AFECTACION ? 
                      `<p>Afectación: ${feature.properties.AFECTACION} ${feature.properties.UNIDAD}</p>` 
                      : ''}
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
