"use client"

import { useEffect, useRef } from "react"
import { Map as LeafletMap, TileLayer, GeoJSON } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { AfectacionesDepartamento } from "@/types"

interface ColombiaMapProps {
  afectaciones: Record<string, AfectacionesDepartamento>
}

export default function ColombiaMap({ afectaciones }: ColombiaMapProps) {
  const getColor = (campo: any) => {
    const afectacion = campo.properties
    if (!afectacion) return "#f4f4f5"

    if (afectacion.TIPO_HIDRO === "PETROLEO") return "#2563eb"
    if (afectacion.TIPO_HIDRO === "GAS") return "#16a34a"
    if (afectacion.TIPO_HIDRO === "PETROLEO-GAS") return "#7e22ce"

    return "#f4f4f5"
  }

  return (
    <div className="h-[600px] w-full relative">
      <LeafletMap
        center={[4.5, -73]}
        zoom={6}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
        <GeoJSON
          data={require("@/attached_assets/campos_petroleros.geojson")}
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
      </LeafletMap>
    </div>
  )
}