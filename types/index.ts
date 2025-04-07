// Tipo para los reportes
export interface Reporte {
  id: number
  campo: string
  tipoNovedad: string
  descripcion: string
  fechaAfectacion: Date
  unidad: string
  afectacion: number
  fechaReporte: Date
  operador: string
  departamento: string
  municipio: string
  historial: HistorialCambio[]
}

// Tipo para el historial de cambios
export interface HistorialCambio {
  fecha: Date
  descripcion: string
  camposModificados: string[]
}

// Tipo para las afectaciones por departamento
export interface AfectacionesDepartamento {
  BOPD: number
  KPCD: number
}

// Tipo para las afectaciones por campo
export interface AfectacionesCampo {
  BOPD: number
  KPCD: number
  total: number
  conteo: number
}

// Tipo para las afectaciones por operador
export interface AfectacionesOperador {
  BOPD: number
  KPCD: number
  total: number
  campos: Set<string>
}

// Tipo para las afectaciones por período
export interface AfectacionesPeriodo {
  BOPD: number
  KPCD: number
}

// Tipo para los datos de tendencia
export interface DatoTendencia {
  fecha: string
  BOPD: number
  KPCD: number
}

// Tipo para los datos de comparativo
export interface ComparativoPeriodo {
  actual: number
  anterior: number
  porcentaje: number
}

// Tipo para el comparativo completo
export interface ComparativoPeriodoCompleto {
  BOPD: ComparativoPeriodo
  KPCD: ComparativoPeriodo
}

// Tipo para los campos petroleros
export interface CampoPetrolero {
  value: string
  label: string
}

// Tipo para los operadores
export interface Operador {
  value: string
  label: string
}

// Tipo para los datos autocompletados
export interface DatosAutocompletados {
  contrato: string
  municipio: string
  departamento: string
  operador: string
}

