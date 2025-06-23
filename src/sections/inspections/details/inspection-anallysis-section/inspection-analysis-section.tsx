import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InspectionDetails } from "@/lib/types/inspections";
import { SystemDeteriorationChart } from "./components/system-deterioration-chart";
import { SystemCriticalityChart } from "./components/system-criticality-chart";
import { CriticalityDistributionChart } from "./components/criticality-distribution-chart";
import { DetectabilityAnalysisChart } from "./components/detectability-analysis-chart";
import { MaterialAnalysisChart } from "./components/material-analysis-chart";
import SectionAnalysisContainer from "./components/section-analysis-container";
import ChartTabs from "./components/chart-tabs";
import { TabsType } from "@/components/ui/tabs-panel/tabs-panel";
import { ChartBarIcon } from "lucide-react";

interface Props {
  inspection: InspectionDetails;
}

export function InspectionAnalysisSection({ inspection }: Props) {
  const tabs: TabsType[] = [
    {
      label: "Deterioros",
      value: "deterioration",
      icon: <ChartBarIcon className="w-4 h-4" />,
      component: (
        <SectionAnalysisContainer
          title="Deterioros por Sistema"
          description="Cantidad de deterioros encontrados en cada sistema"
        >
          <SystemDeteriorationChart inspection={inspection} />
        </SectionAnalysisContainer>
      ),
    },
    {
      label: "Criticidad",
      value: "criticality",
      icon: <ChartBarIcon className="w-4 h-4" />,
      component: (
        <SectionAnalysisContainer
          title="Índice de Criticidad por Sistema"
          description="Comparación de los índices de criticidad entre sistemas"
        >
          <SystemCriticalityChart inspection={inspection} />
        </SectionAnalysisContainer>
      ),
    },
    {
      label: "Distribución",
      value: "distribution",
      icon: <ChartBarIcon className="w-4 h-4" />,
      component: (
        <SectionAnalysisContainer
          title="Distribución de Criticidad"
          description="Distribución porcentual de la criticidad por sistema"
        >
          <CriticalityDistributionChart inspection={inspection} />
        </SectionAnalysisContainer>
      ),
    },

    {
      label: "Detectabilidad",
      value: "detectability",
      icon: <ChartBarIcon className="w-4 h-4" />,
      component: (
        <SectionAnalysisContainer
          title="Análisis de Detectabilidad"
          description="Relación entre detectabilidad y criticidad de los tipos de deterioro"
        >
          <DetectabilityAnalysisChart inspection={inspection} />
        </SectionAnalysisContainer>
      ),
    },
    {
      label: "Materiales",
      value: "materials",
      icon: <ChartBarIcon className="w-4 h-4" />,
      component: (
        <SectionAnalysisContainer
          title="Análisis por Materiales"
          description="Top 10 materiales con mayor cantidad de deterioros"
        >
          <MaterialAnalysisChart inspection={inspection} />
        </SectionAnalysisContainer>
      ),
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Análisis Gráfico de Inspección
        </h2>
        <p className="text-muted-foreground">
          Visualización detallada de los datos de inspección #{inspection._id}
        </p>
      </div>

      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Índice de Criticidad General
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inspection.indiceCriticidad.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Deterioros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inspection.cantDeterioros}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Sistemas Analizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inspection.sistemas.length}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Gráficos en pestañas */}
      <ChartTabs tabs={tabs} />
    </div>
  );
}
