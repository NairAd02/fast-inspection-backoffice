"use client"

import { Cell, Pie, PieChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { InspectionDetails } from "@/lib/types/inspections"


interface CriticalityDistributionChartProps {
  inspection: InspectionDetails
}

export function CriticalityDistributionChart({ inspection }: CriticalityDistributionChartProps) {
  const totalCriticidad = inspection.sistemas.reduce((sum, sistema) => sum + sistema.indiceCriticidad, 0)

  const chartData = inspection.sistemas.map((sistema) => ({
    sistema: sistema.nombre,
    criticidad: sistema.indiceCriticidad,
    porcentaje: ((sistema.indiceCriticidad / totalCriticidad) * 100).toFixed(1),
    fill: `#6b9080`,
  }))

  const chartConfig = inspection.sistemas.reduce((config, sistema) => {
    config[sistema.nombre] = {
      label: sistema.nombre,
      color: `#6b9080`,
    }
    return config
  }, {} as any)

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <PieChart>
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => [
                `${value} (${chartData.find((d) => d.sistema === name)?.porcentaje}%)`,
                "Criticidad",
              ]}
            />
          }
        />
        <Pie
          data={chartData}
          dataKey="criticidad"
          nameKey="sistema"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ porcentaje }) => `${porcentaje}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  )
}
