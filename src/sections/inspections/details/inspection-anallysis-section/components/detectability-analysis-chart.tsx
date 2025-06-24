"use client"

import { Scatter, ScatterChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { InspectionDetails } from "@/lib/types/inspections"


interface DetectabilityAnalysisChartProps {
  inspection: InspectionDetails
}

export function DetectabilityAnalysisChart({ inspection }: DetectabilityAnalysisChartProps) {
  const chartData = inspection.sistemas.flatMap((sistema) =>
    sistema.subsistemas.flatMap((subsistema) =>
      subsistema.materiales.flatMap((material) =>
        material.tiposDeterioros.map((tipoDeterioro) => ({
          detectabilidad: tipoDeterioro.detectabilidad,
          criticidad: tipoDeterioro.indiceCriticidad.valor,
          nombre: tipoDeterioro.nombre,
          sistema: sistema.nombre,
          deterioros: tipoDeterioro.cantDeterioros,
        })),
      ),
    ),
  )

  const chartConfig = {
    detectabilidad: {
      label: "Detectabilidad",
      color: "#6b9080",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
      <ScatterChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="detectabilidad"
          name="Detectabilidad"
          domain={["dataMin - 0.5", "dataMax + 0.5"]}
        />
        <YAxis type="number" dataKey="criticidad" name="Criticidad" domain={["dataMin - 0.5", "dataMax + 0.5"]} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => [value, name === "detectabilidad" ? "Detectabilidad" : "Criticidad"]}
              labelFormatter={(label, payload) => {
                const data = payload?.[0]?.payload
                return data ? `${data.nombre} (${data.sistema})` : label
              }}
            />
          }
        />
        <Scatter dataKey="criticidad" fill="var(--color-detectabilidad)" />
      </ScatterChart>
    </ChartContainer>
  )
}
