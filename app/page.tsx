"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReportForm from "@/components/report-form"
import Dashboard from "@/components/dashboard"
import { ReportesProvider } from "@/context/ReportesContext"

export default function Home() {
  return (
    <ReportesProvider>
      <div className="min-h-screen bg-zinc-50">
        <header className="bg-zinc-800 text-white p-4 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-xl font-semibold">Sistema de Reporte de Novedades</h1>
            <p className="text-zinc-300 text-sm">Campos Petroleros Colombia</p>
          </div>
        </header>

        <main className="container mx-auto p-4 md:p-6">
          <Tabs defaultValue="report" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="report">Reportar Novedad</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </TabsList>
            <TabsContent value="report">
              <ReportForm />
            </TabsContent>
            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ReportesProvider>
  )
}

