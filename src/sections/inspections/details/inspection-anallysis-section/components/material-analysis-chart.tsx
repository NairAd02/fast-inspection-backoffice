"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { InspectionDetails } from "@/lib/types/inspections"


interface MaterialAnalysisChartProps {
  inspection: InspectionDetails
}

export function MaterialAnalysisChart({ inspection }: MaterialAnalysisChartProps) {
  const materialesData = inspection.sistemas.flatMap((sistema) =>
    sistema.subsistemas.flatMap((subsistema) =>
      subsistema.materiales.map((material) => ({
        nombre: material.nombre,
        deterioros: material.cantDeterioros,
        criticidad: material.indiceCriticidad,
        sistema: sistema.nombre,
      })),
    ),
  )

  // Ordenar por cantidad de deterioros y tomar los top 10
  const topMateriales = materialesData
    .sort((a, b) => b.deterioros - a.deterioros)
    .slice(0, 10)
    .map((material) => ({
      material: material.nombre.length > 20 ? material.nombre.substring(0, 20) + "..." : material.nombre,
      deterioros: material.deterioros,
      criticidad: material.criticidad,
      materialCompleto: material.nombre,
      sistema: material.sistema,
    }))

  const chartConfig = {
    deterioros: {
      label: "Deterioros",
      color: "hsl(var(--chart-4))",
    },
    criticidad: {
      label: "Criticidad",
      color: "hsl(var(--chart-5))",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
      <BarChart accessibilityLayer data={topMateriales} margin={{ left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="material"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value, payload) => {
                const data = payload?.[0]?.payload
                return data ? `${data.materialCompleto} (${data.sistema})` : value
              }}
            />
          }
        />
        <Bar yAxisId="left" dataKey="deterioros" fill="var(--color-deterioros)" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="right" dataKey="criticidad" fill="var(--color-criticidad)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
