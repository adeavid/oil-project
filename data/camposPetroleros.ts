import type { CampoPetrolero, DatosAutocompletados } from "@/types"

// Datos de ejemplo para los campos petroleros
export const camposPetroleros: CampoPetrolero[] = [
  { value: "Don Pedro", label: "Don Pedro" },
  { value: "Rubiales", label: "Rubiales" },
  { value: "Caño Limón", label: "Caño Limón" },
  { value: "Cusiana", label: "Cusiana" },
  { value: "La Cira-Infantas", label: "La Cira-Infantas" },
  { value: "Chichimene", label: "Chichimene" },
  { value: "Castilla", label: "Castilla" },
  { value: "Apiay", label: "Apiay" },
]

// Lista de campos para filtrar
export const camposList: CampoPetrolero[] = [{ value: "todos", label: "Todos los campos" }, ...camposPetroleros]

// Datos de ejemplo para autocompletar
export const datosAutocompletados: Record<string, DatosAutocompletados> = {
  "Don Pedro": {
    contrato: "YD SN 1",
    municipio: "CUMARIBO",
    departamento: "VICHADA",
    operador: "CNEOG COLOMBIA SUCURSAL COLOMBIA",
  },
  Rubiales: {
    contrato: "RUBIALES",
    municipio: "PUERTO GAITÁN",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  "Caño Limón": {
    contrato: "CAÑO LIMÓN",
    municipio: "ARAUCA",
    departamento: "ARAUCA",
    operador: "OCCIDENTAL DE COLOMBIA",
  },
  Cusiana: {
    contrato: "CUSIANA",
    municipio: "TAURAMENA",
    departamento: "CASANARE",
    operador: "ECOPETROL S.A.",
  },
  "La Cira-Infantas": {
    contrato: "LA CIRA-INFANTAS",
    municipio: "BARRANCABERMEJA",
    departamento: "SANTANDER",
    operador: "ECOPETROL S.A.",
  },
  Chichimene: {
    contrato: "CHICHIMENE",
    municipio: "ACACÍAS",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  Castilla: {
    contrato: "CASTILLA",
    municipio: "CASTILLA LA NUEVA",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
  Apiay: {
    contrato: "APIAY",
    municipio: "VILLAVICENCIO",
    departamento: "META",
    operador: "ECOPETROL S.A.",
  },
}

