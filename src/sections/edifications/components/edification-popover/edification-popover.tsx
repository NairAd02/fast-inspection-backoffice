import React from "react";
import {
  AlertTriangle,
  Building2,
  Calendar,
  ExternalLink,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { EdificationDetails } from "@/lib/types/edifications";
import EdificationPopoverViewDetailsButton from "./components/edification-popover-view-details-button/edification-popover-view-details-button";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { paths } from "@/routes/path";

interface Props {
  edification: EdificationDetails;
}

export default function EdificationPopover({ edification }: Props) {
  const inspections = edification.inspecciones.data;
  // Calcular estadísticas
  const totalInspections = inspections.length;
  const averageCriticality =
    totalInspections > 0
      ? inspections.reduce(
          (sum, inspection) => sum + inspection.indiceCriticidad,
          0
        ) / totalInspections
      : 0;
  const totalDeterioros = inspections.reduce(
    (sum, inspection) => sum + inspection.cantDeterioros,
    0
  );

  // Obtener la última inspección (más reciente por fecha)
  const lastInspection =
    inspections.length > 0
      ? inspections.reduce((latest, current) =>
          new Date(current.fechaInicio) > new Date(latest.fechaInicio)
            ? current
            : latest
        )
      : null;

  // Determinar el color del badge según criticidad promedio
  const getCriticalityColor = (criticality: number) => {
    if (criticality >= 7) return "destructive";
    if (criticality >= 4) return "secondary";
    return "default";
  };

  const getCriticalityLabel = (criticality: number) => {
    if (criticality >= 7) return "Alta";
    if (criticality >= 4) return "Media";
    return "Baja";
  };
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 rounded-lg p-2">
          <Building2 className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p>{edification.nombre}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        {edification.direccion}
      </p>
      <div className="flex flex-col gap-4">
        {/* Estadísticas principales */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{totalInspections}</div>
            <div className="text-xs text-muted-foreground">Inspecciones</div>
          </div>

          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{totalDeterioros}</div>
            <div className="text-xs text-muted-foreground">
              Deterioros Total
            </div>
          </div>
        </div>

        {/* Criticidad promedio */}
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Criticidad Promedio</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              {averageCriticality.toFixed(1)}
            </span>
            <Badge
              variant={getCriticalityColor(averageCriticality)}
              className="text-xs"
            >
              {getCriticalityLabel(averageCriticality)}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Acciones */}
        <div className="flex flex-col gap-2">
          {lastInspection && (
            <NavigationComponent
              href={paths.inspection({ id: lastInspection.id.toString() }).root}
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Ver Última Inspección
                <span className="ml-auto text-xs text-muted-foreground">
                  {new Date(lastInspection.fechaInicio).toLocaleDateString()}
                </span>
              </Button>
            </NavigationComponent>
          )}

          <EdificationPopoverViewDetailsButton
            edificationId={edification.id.toString()}
          />
        </div>
      </div>
    </div>
  );
}
