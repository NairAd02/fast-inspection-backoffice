import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";
import { InspectionHeader } from "./components/inspection-header";
import { InspectionDetails } from "@/lib/types/inspections";
import { SystemsAccordion } from "./components/systems-accordion";
import { paths } from "@/routes/path";
import { InspectionAnalysisSection } from "./inspection-anallysis-section/inspection-analysis-section";
import ReportGenerationSection from "./components/report-generation-section";
import DetailsSectionHeader from "@/components/details-section-header/details-section-header";

interface Props {
  inspection: InspectionDetails;
}

export default function InspectionDetailsContainer({ inspection }: Props) {
  const totalDeteriorations = inspection.sistemas.reduce((total, system) => {
    return (
      total +
      system.subsistemas.reduce((systemTotal, subsystem) => {
        return (
          systemTotal +
          subsystem.materiales.reduce((subsystemTotal, material) => {
            return (
              subsystemTotal +
              material.tiposDeterioros.reduce(
                (materialTotal, deteriorationType) => {
                  return materialTotal + deteriorationType.deterioros.length;
                },
                0
              )
            );
          }, 0)
        );
      }, 0)
    );
  }, 0);

  return (
    <div className="min-h-screen ">
      <DetailsSectionHeader
        href={paths.edifications.root}
        title="Detalles de la Inspección"
        description="Visualice los Detalles de la Inspección"
      />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <InspectionHeader inspection={inspection} />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <ReportGenerationSection inspection={inspection} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Resumen Estadístico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {inspection.sistemas.length}
                  </div>
                  <div className="text-sm text-gray-600">Sistemas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {inspection.sistemas.reduce(
                      (total, system) => total + system.subsistemas.length,
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Subsistemas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {inspection.sistemas.reduce(
                      (total, system) =>
                        total +
                        system.subsistemas.reduce(
                          (subTotal, subsystem) =>
                            subTotal + subsystem.materiales.length,
                          0
                        ),
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Materiales</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {totalDeteriorations}
                  </div>
                  <div className="text-sm text-gray-600">
                    Deterioros Totales
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* Systems Details */}
        <div className="mb-8">
          <SystemsAccordion systems={inspection.sistemas} />
        </div>

        <InspectionAnalysisSection inspection={inspection} />

        {/* Footer */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <Badge variant="outline">
              Última actualización: {new Date().toLocaleDateString("es-ES")}
            </Badge>
            <Badge variant="outline">
              Total deterioros activos: {totalDeteriorations}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
