
"use client"

import { useEffect, useState } from "react"
import dynamic from 'next/dynamic'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { AfectacionesDepartamento } from "@/types"
import { useReportes } from "@/context/ReportesContext"
import "leaflet/dist/leaflet.css"
import { useRef } from "react" // ← nuevo import
import type { Map as LeafletMap } from "leaflet" // ← nuevo import
import type { LeafletEvent } from "leaflet"


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
  const { reportes } = useReportes()
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroArea, setFiltroArea] = useState("todos")
  const [filtroCampo, setFiltroCampo] = useState("todos")
  const [geoJsonData, setGeoJsonData] = useState<any>(null)
  const [filteredGeoJsonData, setFilteredGeoJsonData] = useState<any>(null)


  const mapRef = useRef<LeafletMap | null>(null) // ← NUEVO: referencia al mapa

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

        if (filtroEstado !== "todos" && props.ESTADO_RUTY !== filtroEstado) {
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
        if (filtroCampo!== "todos" && props.CAMPO !== filtroCampo) {
            return false
        }

        return true
      })
    }

    setFilteredGeoJsonData(filtered)
  }, [geoJsonData, filtroTipo, filtroEstado, filtroArea, filtroCampo])

  /////////
  /////////
  ////////
  ////////
  useEffect(() => {
    if (!geoJsonData || filtroCampo === "todos" || !mapRef.current) return

    const selectedFeature = geoJsonData.features.find(
      (f: any) => f.properties.CAMPO === filtroCampo
    )

    if (selectedFeature) {
      const coords = selectedFeature.geometry.coordinates
      const latLng =
        selectedFeature.geometry.type === "Point"
          ? [coords[1], coords[0]]
          : [coords[0][0][1], coords[0][0][0]] // fallback para polígono

      mapRef.current.flyTo(latLng, 12) // 👈 zoom automático al campo
    }
  }, [filtroCampo, geoJsonData])

  //////////
  //////////
  ///////
  

  // Get report data for a field
  const getReporteField = (fieldName: string) => {
    return reportes.find(r => r.campo === fieldName)
  }

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

        <Select value={filtroCampo} onValueChange={setFiltroCampo}>
          <SelectTrigger>
            <SelectValue placeholder="Campo" />
          </SelectTrigger>
          <SelectContent className="z-[1000]">
            <SelectItem value="todos">Todos los campos</SelectItem>
            <SelectItem value="ABANICO">ABANICO</SelectItem>
            <SelectItem value="ABARCO">ABARCO</SelectItem>
            <SelectItem value="ABEJAS">ABEJAS</SelectItem>
            <SelectItem value="ACAE SAN MIGUEL">ACAE SAN MIGUEL</SelectItem>
            <SelectItem value="ACORDIONERO">ACORDIONERO</SelectItem>
            <SelectItem value="ADALIA">ADALIA</SelectItem>
            <SelectItem value="AGUAS BLANCAS">AGUAS BLANCAS</SelectItem>
            <SelectItem value="AKACIAS">AKACIAS</SelectItem>
            <SelectItem value="AKIRA">AKIRA</SelectItem>
            <SelectItem value="ALBERTA">ALBERTA</SelectItem>
            <SelectItem value="ALEPE">ALEPE</SelectItem>
            <SelectItem value="ALQAMARI">ALQAMARI</SelectItem>
            <SelectItem value="ALVA SUR">ALVA SUR</SelectItem>
            <SelectItem value="AMBROSÍA">AMBROSÍA</SelectItem>
            <SelectItem value="ANDALUZ">ANDALUZ</SelectItem>
            <SelectItem value="ANDINA">ANDINA</SelectItem>
            <SelectItem value="APIAY">APIAY</SelectItem>
            <SelectItem value="APIAY ESTE">APIAY ESTE</SelectItem>
            <SelectItem value="ARAGUATO">ARAGUATO</SelectItem>
            <SelectItem value="ARAUCA">ARAUCA</SelectItem>
            <SelectItem value="AREA TECA-COCORNA">AREA TECA-COCORNA</SelectItem>
            <SelectItem value="ARRAYÁN">ARRAYÁN</SelectItem>
            <SelectItem value="ARRECIFE">ARRECIFE</SelectItem>
            <SelectItem value="AULLADOR">AULLADOR</SelectItem>
            <SelectItem value="AUSTRAL">AUSTRAL</SelectItem>
            <SelectItem value="AZAFRÁN">AZAFRÁN</SelectItem>
            <SelectItem value="AZOGUE">AZOGUE</SelectItem>
            <SelectItem value="BACANO">BACANO</SelectItem>
            <SelectItem value="BALCÓN">BALCÓN</SelectItem>
            <SelectItem value="BARQUEREÑA">BARQUEREÑA</SelectItem>
            <SelectItem value="BASTIDAS">BASTIDAS</SelectItem>
            <SelectItem value="BAYONERO">BAYONERO</SelectItem>
            <SelectItem value="BEGONIA">BEGONIA</SelectItem>
            <SelectItem value="BOLÍVAR">BOLÍVAR</SelectItem>
            <SelectItem value="BONANZA">BONANZA</SelectItem>
            <SelectItem value="BONGA">BONGA</SelectItem>
            <SelectItem value="BORAL">BORAL</SelectItem>
            <SelectItem value="BORANDA">BORANDA</SelectItem>
            <SelectItem value="BRISAS">BRISAS</SelectItem>
            <SelectItem value="BULLERENGUE">BULLERENGUE</SelectItem>
            <SelectItem value="CABIONA">CABIONA</SelectItem>
            <SelectItem value="CAIPAL">CAIPAL</SelectItem>
            <SelectItem value="CAJUA">CAJUA</SelectItem>
            <SelectItem value="CALONA">CALONA</SelectItem>
            <SelectItem value="CANACABARE">CANACABARE</SelectItem>
            <SelectItem value="Canaguay">Canaguay</SelectItem>
            <SelectItem value="CANAGUEY">CANAGUEY</SelectItem>
            <SelectItem value="CANDALAY">CANDALAY</SelectItem>
            <SelectItem value="CANDELILLA">CANDELILLA</SelectItem>
            <SelectItem value="CAÑO GANDUL">CAÑO GANDUL</SelectItem>
            <SelectItem value="CAÑO GARZA">CAÑO GARZA</SelectItem>
            <SelectItem value="CAÑO GARZA ESTE">CAÑO GARZA ESTE</SelectItem>
            <SelectItem value="CAÑO GARZA NORTE ">CAÑO GARZA NORTE </SelectItem>
            <SelectItem value="CAÑO LIMÓN">CAÑO LIMÓN</SelectItem>
            <SelectItem value="CAÑO RONDÓN">CAÑO RONDÓN</SelectItem>
            <SelectItem value="CAÑO SUR ESTE">CAÑO SUR ESTE</SelectItem>
            <SelectItem value="CAÑO YARUMAL">CAÑO YARUMAL</SelectItem>
            <SelectItem value="CAPACHOS">CAPACHOS</SelectItem>
            <SelectItem value="CAPACHOS SUR">CAPACHOS SUR</SelectItem>
            <SelectItem value="CARACARA SUR A">CARACARA SUR A</SelectItem>
            <SelectItem value="CARACARA SUR B Y C">CARACARA SUR B Y C</SelectItem>
            <SelectItem value="CARETO">CARETO</SelectItem>
            <SelectItem value="CARIBE">CARIBE</SelectItem>
            <SelectItem value="CARICARE">CARICARE</SelectItem>
            <SelectItem value="CARMENTEA">CARMENTEA</SelectItem>
            <SelectItem value="CARRIZALES">CARRIZALES</SelectItem>
            <SelectItem value="CARRIZALES NORTE">CARRIZALES NORTE</SelectItem>
            <SelectItem value="CARUPANA">CARUPANA</SelectItem>
            <SelectItem value="CASABE">CASABE</SelectItem>
            <SelectItem value="CASABE SUR">CASABE SUR</SelectItem>
            <SelectItem value="CASTILLA ">CASTILLA </SelectItem>
            <SelectItem value="CASTILLA NORTE">CASTILLA NORTE</SelectItem>
            <SelectItem value="CEIBO">CEIBO</SelectItem>
            <SelectItem value="CERNÍCALO">CERNÍCALO</SelectItem>
            <SelectItem value="CHAPARRITO">CHAPARRITO</SelectItem>
            <SelectItem value="CHENCHE">CHENCHE</SelectItem>
            <SelectItem value="CHICHIMENE">CHICHIMENE</SelectItem>
            <SelectItem value="CHICHIMENE SW">CHICHIMENE SW</SelectItem>
            <SelectItem value="CHIPIRÓN">CHIPIRÓN</SelectItem>
            <SelectItem value="CHIRICOCA">CHIRICOCA</SelectItem>
            <SelectItem value="CHUIRA">CHUIRA</SelectItem>
            <SelectItem value="CHURUYACO">CHURUYACO</SelectItem>
            <SelectItem value="CICUCO">CICUCO</SelectItem>
            <SelectItem value="CIRIGÜELO">CIRIGÜELO</SelectItem>
            <SelectItem value="COBRA">COBRA</SelectItem>
            <SelectItem value="COHEMBI">COHEMBI</SelectItem>
            <SelectItem value="COLÓN">COLÓN</SelectItem>
            <SelectItem value="COPA UNIFICADO">COPA UNIFICADO</SelectItem>
            <SelectItem value="CORAZÓN">CORAZÓN</SelectItem>
            <SelectItem value="CORAZÓN WEST">CORAZÓN WEST</SelectItem>
            <SelectItem value="CORCEL A">CORCEL A</SelectItem>
            <SelectItem value="CORCEL C">CORCEL C</SelectItem>
            <SelectItem value="CORCEL D">CORCEL D</SelectItem>
            <SelectItem value="COREN">COREN</SelectItem>
            <SelectItem value="COROCORA">COROCORA</SelectItem>
            <SelectItem value="CORRALES">CORRALES</SelectItem>
            <SelectItem value="CORSUR">CORSUR</SelectItem>
            <SelectItem value="COSECHA-A">COSECHA-A</SelectItem>
            <SelectItem value="COSTAYACO">COSTAYACO</SelectItem>
            <SelectItem value="CRAVO ESTE">CRAVO ESTE</SelectItem>
            <SelectItem value="CRISTALINA">CRISTALINA</SelectItem>
            <SelectItem value="CUERVA NORESTE">CUERVA NORESTE</SelectItem>
            <SelectItem value="CUERVA OESTE">CUERVA OESTE</SelectItem>
            <SelectItem value="CUERVA SUR">CUERVA SUR</SelectItem>
            <SelectItem value="CUMPLIDOR">CUMPLIDOR</SelectItem>
            <SelectItem value="CUPIAGUA">CUPIAGUA</SelectItem>
            <SelectItem value="CUPIAGUA LIRIA">CUPIAGUA LIRIA</SelectItem>
            <SelectItem value="CUPIAGUA SUR">CUPIAGUA SUR</SelectItem>
            <SelectItem value="CURITO">CURITO</SelectItem>
            <SelectItem value="CUSIANA">CUSIANA</SelectItem>
            <SelectItem value="CUSIANA NORTE">CUSIANA NORTE</SelectItem>
            <SelectItem value="DANES">DANES</SelectItem>
            <SelectItem value="DINA CRETÁCEOS">DINA CRETÁCEOS</SelectItem>
            <SelectItem value="DINA NORTE">DINA NORTE</SelectItem>
            <SelectItem value="DINA TERCIARIOS">DINA TERCIARIOS</SelectItem>
            <SelectItem value="DOROTEA B">DOROTEA B</SelectItem>
            <SelectItem value="DOROTEA E">DOROTEA E</SelectItem>
            <SelectItem value="EL DIFÍCIL">EL DIFÍCIL</SelectItem>
            <SelectItem value="EL NIÑO">EL NIÑO</SelectItem>
            <SelectItem value="ELIZITA">ELIZITA</SelectItem>
            <SelectItem value="ESPIGUERO">ESPIGUERO</SelectItem>
            <SelectItem value="ESTERO">ESTERO</SelectItem>
            <SelectItem value="FINN">FINN</SelectItem>
            <SelectItem value="FLAMENCOS">FLAMENCOS</SelectItem>
            <SelectItem value="FLOREÑA">FLOREÑA</SelectItem>
            <SelectItem value="FLOREÑA MIRADOR">FLOREÑA MIRADOR</SelectItem>
            <SelectItem value="FRANKMAVE">FRANKMAVE</SelectItem>
            <SelectItem value="GALEMBO">GALEMBO</SelectItem>
            <SelectItem value="GARZAS">GARZAS</SelectItem>
            <SelectItem value="GAVAN">GAVAN</SelectItem>
            <SelectItem value="GIBRALTAR">GIBRALTAR</SelectItem>
            <SelectItem value="GIGANTE">GIGANTE</SelectItem>
            <SelectItem value="GIRASOL">GIRASOL</SelectItem>
            <SelectItem value="GRETA OTO">GRETA OTO</SelectItem>
            <SelectItem value="GUACHARACA">GUACHARACA</SelectItem>
            <SelectItem value="GUACO">GUACO</SelectItem>
            <SelectItem value="GUANAPALO">GUANAPALO</SelectItem>
            <SelectItem value="GUANDO">GUANDO</SelectItem>
            <SelectItem value="GUANDO SW">GUANDO SW</SelectItem>
            <SelectItem value="GUARILAQUE">GUARILAQUE</SelectItem>
            <SelectItem value="GUARROJO">GUARROJO</SelectItem>
            <SelectItem value="GUASAR">GUASAR</SelectItem>
            <SelectItem value="GUATIQUIA">GUATIQUIA</SelectItem>
            <SelectItem value="GUAYUYACO">GUAYUYACO</SelectItem>
            <SelectItem value="HALCÓN">HALCÓN</SelectItem>
            <SelectItem value="HAMACA">HAMACA</SelectItem>
            <SelectItem value="HOATZIN">HOATZIN</SelectItem>
            <SelectItem value="HOATZIN NORTE">HOATZIN NORTE</SelectItem>
            <SelectItem value="HORMIGA">HORMIGA</SelectItem>
            <SelectItem value="IBAMACA">IBAMACA</SelectItem>
            <SelectItem value="INDICO">INDICO</SelectItem>
            <SelectItem value="INFANTAS">INFANTAS</SelectItem>
            <SelectItem value="ISTANBUL">ISTANBUL</SelectItem>
            <SelectItem value="JACAMAR">JACAMAR</SelectItem>
            <SelectItem value="JACANA">JACANA</SelectItem>
            <SelectItem value="JAZMIN">JAZMIN</SelectItem>
            <SelectItem value="JIBA UNIFICADO">JIBA UNIFICADO</SelectItem>
            <SelectItem value="JORCAN">JORCAN</SelectItem>
            <SelectItem value="JORDÁN">JORDÁN</SelectItem>
            <SelectItem value="JUANAMBU">JUANAMBU</SelectItem>
            <SelectItem value="KANANASKIS">KANANASKIS</SelectItem>
            <SelectItem value="KIMBO">KIMBO</SelectItem>
            <SelectItem value="KITARO">KITARO</SelectItem>
            <SelectItem value="LA BELLEZA">LA BELLEZA</SelectItem>
            <SelectItem value="LA CAÑADA NORTE">LA CAÑADA NORTE</SelectItem>
            <SelectItem value="La Cañada Norte PUE">La Cañada Norte PUE</SelectItem>
            <SelectItem value="LA CIRA">LA CIRA</SelectItem>
            <SelectItem value="LA FLORA">LA FLORA</SelectItem>
            <SelectItem value="LA GLORIA">LA GLORIA</SelectItem>
            <SelectItem value="LA HOCHA">LA HOCHA</SelectItem>
            <SelectItem value="La Hocha - PUE">La Hocha - PUE</SelectItem>
            <SelectItem value="LA JAGUA">LA JAGUA</SelectItem>
            <SelectItem value="LA PUNTA">LA PUNTA</SelectItem>
            <SelectItem value="LA URRACA">LA URRACA</SelectItem>
            <SelectItem value="LABRADOR">LABRADOR</SelectItem>
            <SelectItem value="LAS MARACAS ">LAS MARACAS </SelectItem>
            <SelectItem value="LEONO">LEONO</SelectItem>
            <SelectItem value="LIBERTAD">LIBERTAD</SelectItem>
            <SelectItem value="LIBERTAD NORTE">LIBERTAD NORTE</SelectItem>
            <SelectItem value="LILIA-ANGIE UNIFICADO">LILIA-ANGIE UNIFICADO</SelectItem>
            <SelectItem value="LISAMA">LISAMA</SelectItem>
            <SelectItem value="LLANITO UNIFICADO">LLANITO UNIFICADO</SelectItem>
            <SelectItem value="LLANOS-58-4">LLANOS-58-4</SelectItem>
            <SelectItem value="LOMA LARGA">LOMA LARGA</SelectItem>
            <SelectItem value="Lorito">Lorito</SelectItem>
            <SelectItem value="LORO">LORO</SelectItem>
            <SelectItem value="LOS ACEITES">LOS ACEITES</SelectItem>
            <SelectItem value="LOS ANGELES">LOS ANGELES</SelectItem>
            <SelectItem value="LOS HATOS">LOS HATOS</SelectItem>
            <SelectItem value="LOS POTROS">LOS POTROS</SelectItem>
            <SelectItem value="MACANA">MACANA</SelectItem>
            <SelectItem value="MAMEY">MAMEY</SelectItem>
            <SelectItem value="MANÁ">MANÁ</SelectItem>
            <SelectItem value="MANSOYA">MANSOYA</SelectItem>
            <SelectItem value="MANTIS">MANTIS</SelectItem>
            <SelectItem value="MARY">MARY</SelectItem>
            <SelectItem value="MATACHÍN NORTE">MATACHÍN NORTE</SelectItem>
            <SelectItem value="MATACHÍN SUR">MATACHÍN SUR</SelectItem>
            <SelectItem value="MATEMARRANO">MATEMARRANO</SelectItem>
            <SelectItem value="MAURITÍA ESTE">MAURITÍA ESTE</SelectItem>
            <SelectItem value="MAURITÍA NORTE">MAURITÍA NORTE</SelectItem>
            <SelectItem value="MAUTE">MAUTE</SelectItem>
            <SelectItem value="MAX ">MAX </SelectItem>
            <SelectItem value="MIRTO - AGAPANTO UNIFICADO">MIRTO - AGAPANTO UNIFICADO</SelectItem>
            <SelectItem value="MONO ARAÑA">MONO ARAÑA</SelectItem>
            <SelectItem value="MOQUETA">MOQUETA</SelectItem>
            <SelectItem value="MORICHE">MORICHE</SelectItem>
            <SelectItem value="MORROCOY">MORROCOY</SelectItem>
            <SelectItem value="NANCY">NANCY</SelectItem>
            <SelectItem value="NARE SUR">NARE SUR</SelectItem>
            <SelectItem value="NASHIRA NORTE">NASHIRA NORTE</SelectItem>
            <SelectItem value="NUTRIA">NUTRIA</SelectItem>
            <SelectItem value="OCELOTE">OCELOTE</SelectItem>
            <SelectItem value="OJO DE TIGRE">OJO DE TIGRE</SelectItem>
            <SelectItem value="OMI">OMI</SelectItem>
            <SelectItem value="OPÓN">OPÓN</SelectItem>
            <SelectItem value="ORITO">ORITO</SelectItem>
            <SelectItem value="OROPÉNDOLA">OROPÉNDOLA</SelectItem>
            <SelectItem value="ORTEGA">ORTEGA</SelectItem>
            <SelectItem value="OSO PARDO">OSO PARDO</SelectItem>
            <SelectItem value="PACANDE">PACANDE</SelectItem>
            <SelectItem value="PACHAQUIARO">PACHAQUIARO</SelectItem>
            <SelectItem value="PALAGUA">PALAGUA</SelectItem>
            <SelectItem value="PALERMO - SANTA CLARA UNIFICADO">PALERMO - SANTA CLARA UNIFICADO</SelectItem>
            <SelectItem value="PALMARITO">PALMARITO</SelectItem>
            <SelectItem value="PANTRO">PANTRO</SelectItem>
            <SelectItem value="PARAVARE">PARAVARE</SelectItem>
            <SelectItem value="PAUTO SUR">PAUTO SUR</SelectItem>
            <SelectItem value="PAUTO SUR RECETOR">PAUTO SUR RECETOR</SelectItem>
            <SelectItem value="PAYOA">PAYOA</SelectItem>
            <SelectItem value="PAYOA WEST">PAYOA WEST</SelectItem>
            <SelectItem value="PEGUITA">PEGUITA</SelectItem>
            <SelectItem value="PEGUITA II">PEGUITA II</SelectItem>
            <SelectItem value="PEGUITA III">PEGUITA III</SelectItem>
            <SelectItem value="PEGUITA SW">PEGUITA SW</SelectItem>
            <SelectItem value="PENDARE ">PENDARE </SelectItem>
            <SelectItem value="Pendare Norte">Pendare Norte</SelectItem>
            <SelectItem value="PEÑAS BLANCAS">PEÑAS BLANCAS</SelectItem>
            <SelectItem value="PETIRROJO UNIFICADO">PETIRROJO UNIFICADO</SelectItem>
            <SelectItem value="PINTADO">PINTADO</SelectItem>
            <SelectItem value="PIRITO">PIRITO</SelectItem>
            <SelectItem value="PISINGO">PISINGO</SelectItem>
            <SelectItem value="PLATANILLO">PLATANILLO</SelectItem>
            <SelectItem value="POMPEYA">POMPEYA</SelectItem>
            <SelectItem value="PROVINCIA">PROVINCIA</SelectItem>
            <SelectItem value="Pumara">Pumara</SelectItem>
            <SelectItem value="QUIFA">QUIFA</SelectItem>
            <SelectItem value="QUILLACINGA">QUILLACINGA</SelectItem>
            <SelectItem value="QUINDE">QUINDE</SelectItem>
            <SelectItem value="QURIYANA">QURIYANA</SelectItem>
            <SelectItem value="RAMIRIQUI">RAMIRIQUI</SelectItem>
            <SelectItem value="RANCHO HERMOSO">RANCHO HERMOSO</SelectItem>
            <SelectItem value="RANCHO QUEMADO">RANCHO QUEMADO</SelectItem>
            <SelectItem value="RECETOR WEST">RECETOR WEST</SelectItem>
            <SelectItem value="REDONDO">REDONDO</SelectItem>
            <SelectItem value="REDONDO ESTE">REDONDO ESTE</SelectItem>
            <SelectItem value="REMACHE NORTE">REMACHE NORTE</SelectItem>
            <SelectItem value="REMACHE SUR">REMACHE SUR</SelectItem>
            <SelectItem value="REX">REX</SelectItem>
            <SelectItem value="REX NE">REX NE</SelectItem>
            <SelectItem value="RIO CRAVO ESTE">RIO CRAVO ESTE</SelectItem>
            <SelectItem value="RÍO OPIA">RÍO OPIA</SelectItem>
            <SelectItem value="RÍO SALDAÑA">RÍO SALDAÑA</SelectItem>
            <SelectItem value="RIO ZULIA">RIO ZULIA</SelectItem>
            <SelectItem value="RUBIALES">RUBIALES</SelectItem>
            <SelectItem value="RUMBA">RUMBA</SelectItem>
            <SelectItem value="SABANERO">SABANERO</SelectItem>
            <SelectItem value="SAIMIRÍ">SAIMIRÍ</SelectItem>
            <SelectItem value="SALINA">SALINA</SelectItem>
            <SelectItem value="SALTADOR">SALTADOR</SelectItem>
            <SelectItem value="SAN ANTONIO">SAN ANTONIO</SelectItem>
            <SelectItem value="SAN FRANCISCO">SAN FRANCISCO</SelectItem>
            <SelectItem value="SAN ROQUE">SAN ROQUE</SelectItem>
            <SelectItem value="SANTA LUCÍA">SANTA LUCÍA</SelectItem>
            <SelectItem value="SANTIAGO">SANTIAGO</SelectItem>
            <SelectItem value="SANTO DOMINGO UNIFICADO">SANTO DOMINGO UNIFICADO</SelectItem>
            <SelectItem value="SARDINAS">SARDINAS</SelectItem>
            <SelectItem value="SARDINATA">SARDINATA</SelectItem>
            <SelectItem value="SAURIO">SAURIO</SelectItem>
            <SelectItem value="SUCIO">SUCIO</SelectItem>
            <SelectItem value="SURIA">SURIA</SelectItem>
            <SelectItem value="SURIA SUR">SURIA SUR</SelectItem>
            <SelectItem value="TELLO">TELLO</SelectItem>
            <SelectItem value="TEMPRANILLO UNIFICADO">TEMPRANILLO UNIFICADO</SelectItem>
            <SelectItem value="TENAY">TENAY</SelectItem>
            <SelectItem value="TERECAY">TERECAY</SelectItem>
            <SelectItem value="TESORO">TESORO</SelectItem>
            <SelectItem value="TIBU">TIBÚ</SelectItem>
            <SelectItem value="TIGANA ">TIGANA </SelectItem>
            <SelectItem value="TILO">TILO</SelectItem>
            <SelectItem value="TILODIRÁN">TILODIRÁN</SelectItem>
            <SelectItem value="TINAMU">TINAMU</SelectItem>
            <SelectItem value="TISQUIRAMA">TISQUIRAMA</SelectItem>
            <SelectItem value="TOCARIA">TOCARIA</SelectItem>
            <SelectItem value="TOLDADO">TOLDADO</SelectItem>
            <SelectItem value="TOQUI TOQUI">TOQUI TOQUI</SelectItem>
            <SelectItem value="TORITOS">TORITOS</SelectItem>
            <SelectItem value="TORO SENTADO">TORO SENTADO</SelectItem>
            <SelectItem value="TORO SENTADO NORTE">TORO SENTADO NORTE</SelectItem>
            <SelectItem value="TORO SENTADO WEST">TORO SENTADO WEST</SelectItem>
            <SelectItem value="TOROYACO">TOROYACO</SelectItem>
            <SelectItem value="TOTARE">TOTARE</SelectItem>
            <SelectItem value="TUA">TUA</SelectItem>
            <SelectItem value="TULIPÁN">TULIPÁN</SelectItem>
            <SelectItem value="TURPIAL">TURPIAL</SelectItem>
            <SelectItem value="UNDERRIVER">UNDERRIVER</SelectItem>
            <SelectItem value="UNIFICADO PALOGRANDE">UNIFICADO PALOGRANDE</SelectItem>
            <SelectItem value="Unificado Río Ceibas">Unificado Río Ceibas</SelectItem>
            <SelectItem value="UNUMA">UNUMA</SelectItem>
            <SelectItem value="VALDIVIA - ALMAGRO">VALDIVIA - ALMAGRO</SelectItem>
            <SelectItem value="VELASQUEZ">VELASQUEZ</SelectItem>
            <SelectItem value="VENUS">VENUS</SelectItem>
            <SelectItem value="VIGIA">VIGIA</SelectItem>
            <SelectItem value="VIGIA SUR">VIGIA SUR</SelectItem>
            <SelectItem value="VIKINGO">VIKINGO</SelectItem>
            <SelectItem value="VIREO">VIREO</SelectItem>
            <SelectItem value="YAGUARA">YAGUARA</SelectItem>
            <SelectItem value="YAGUAZO">YAGUAZO</SelectItem>
            <SelectItem value="YAMÚ">YAMÚ</SelectItem>
            <SelectItem value="YARIGUÍ-CANTAGALLO">YARIGUÍ-CANTAGALLO</SelectItem>
            <SelectItem value="YATAY">YATAY</SelectItem>
            <SelectItem value="YENAC">YENAC</SelectItem>
            <SelectItem value="ZOE">ZOE</SelectItem>
            <SelectItem value="ZOPILOTE">ZOPILOTE</SelectItem>
            <SelectItem value="ZORZAL">ZORZAL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[600px] w-full relative">
        <MapContainer
          center={[4.5, -73]}
          zoom={6}
          className="h-full w-full"
          key={JSON.stringify([filtroTipo, filtroEstado, filtroArea, filtroCampo])}
          whenReady={(event: LeafletEvent) => {
            mapRef.current = event.target // ✅ guarda instancia correctamente
          }}
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
                const fieldReportes = reportes.filter(r => r.campo === feature.properties.CAMPO);
                const latestReporte = fieldReportes.length > 0 ? 
                  fieldReportes.reduce((a, b) => new Date(a.fechaAfectacion) > new Date(b.fechaAfectacion) ? a : b) 
                  : null;
                
                // Calculate historical sums by unit type
                const historicalSums = fieldReportes.reduce((sums, r) => {
                  sums[r.unidad] = (sums[r.unidad] || 0) + r.afectacion;
                  return sums;
                }, {} as Record<string, number>);

                let popupContent = `
                  <div class="p-2">
                    <h3 class="font-bold">${feature.properties.CAMPO}</h3>
                    <p>Tipo: ${feature.properties.TIPO_HIDRO}</p>
                    <p>Estado: ${feature.properties.ESTADO_RUTY || 'No especificado'}</p>
                    <p>Área: ${feature.properties.AREA_KM2?.toFixed(2) || 0} km²</p>
                    ${latestReporte ? `
                      <div class="mt-2 p-2 bg-red-50 rounded">
                        <p class="font-semibold text-zinc-700">Última afectación:</p>
                        <p class="font-bold text-red-600">${latestReporte.afectacion} ${latestReporte.unidad}</p>
                        <p class="text-sm mt-1">${latestReporte.descripcion}</p>
                        <p class="text-xs mt-1 text-gray-600">Fecha: ${latestReporte.fechaAfectacion ? new Date(latestReporte.fechaAfectacion).toLocaleDateString() : 'No especificada'}</p>
                      </div>
                      ${Object.keys(historicalSums).length > 0 ? `
                        <div class="mt-2 p-2 bg-zinc-50 rounded">
                          <p class="font-semibold text-zinc-700">Total histórico:</p>
                          ${Object.entries(historicalSums).map(([unit, sum]) => 
                            `<p class="text-sm font-bold text-zinc-600">${sum.toLocaleString()} ${unit}</p>`
                          ).join('')}
                        </div>
                      ` : ''}
                    ` : ''}
                  </div>
                `
                layer.bindPopup(popupContent)
              }}
              style={(feature) => {
                const reporte = reportes.find(r => r.campo === feature.properties?.CAMPO)
                return {
                    fillColor: reporte ? '#ef4444' : getColor(feature),
                    fillOpacity: 0.6,
                    weight: 2,
                    color: reporte ? '#b91c1c' : getColor(feature)
                }
              }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  )
}
