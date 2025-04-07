import type { DatoTendencia } from "@/types"

// Función para generar fechas específicas en formato dd/MM
function getFechaFormateada(año: number, mes: number, dia: number): string {
  return `${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}`
}

// Datos históricos para gráficos de tendencia (últimos 10 días: 27 de marzo a 7 de abril de 2025)
export const datosTendencia: DatoTendencia[] = [
  { fecha: getFechaFormateada(2025, 3, 27), BOPD: 1200, KPCD: 1800 },
  { fecha: getFechaFormateada(2025, 3, 28), BOPD: 950, KPCD: 1600 },
  { fecha: getFechaFormateada(2025, 3, 29), BOPD: 1100, KPCD: 2000 },
  { fecha: getFechaFormateada(2025, 3, 30), BOPD: 1800, KPCD: 1900 },
  { fecha: getFechaFormateada(2025, 3, 31), BOPD: 1500, KPCD: 2200 },
  { fecha: getFechaFormateada(2025, 4, 1), BOPD: 2100, KPCD: 1800 },
  { fecha: getFechaFormateada(2025, 4, 2), BOPD: 1900, KPCD: 1600 },
  { fecha: getFechaFormateada(2025, 4, 3), BOPD: 1750, KPCD: 1200 },
  { fecha: getFechaFormateada(2025, 4, 4), BOPD: 1850, KPCD: 1900 },
  { fecha: getFechaFormateada(2025, 4, 5), BOPD: 1700, KPCD: 1700 },
  { fecha: getFechaFormateada(2025, 4, 6), BOPD: 1400, KPCD: 1500 },
  { fecha: getFechaFormateada(2025, 4, 7), BOPD: 1600, KPCD: 2300 },
]

