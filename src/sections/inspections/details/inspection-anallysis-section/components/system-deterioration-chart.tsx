"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { InspectionDetails } from "@/lib/types/inspections"


interface SystemDeteriorationChartProps {
  inspection: InspectionDetails
}

export function SystemDeteriorationChart({ inspection }: SystemDeteriorationChartProps) {
  const chartData = inspection.sistemas.map((sistema) => ({
    sistema: sistema.nombre.length > 15 ? sistema.nombre.substring(0, 15) + "..." : sistema.nombre,
    deterioros: sistema.cantDeterioros,
    sistemaCompleto: sistema.nombre,
  }))

  const chartConfig = {
    deterioros: {
      label: "Deterioros",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData} margin={{ left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="sistema"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value, payload) => {
                const data = payload?.[0]?.payload
                return data?.sistemaCompleto || value
              }}
            />
          }
        />
        <Bar dataKey="deterioros" fill="var(--color-deterioros)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
