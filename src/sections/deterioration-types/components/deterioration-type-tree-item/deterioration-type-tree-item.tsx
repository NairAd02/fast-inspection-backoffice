import { Badge } from "@/components/ui/badge";
import { DeteriorationType } from "@/lib/types/deterioration-type";
import { WrenchIcon } from "lucide-react";
import React from "react";

interface Props {
  deteriorationType: DeteriorationType;
}

export default function DeteriororationTypeTreeItem({
  deteriorationType,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <WrenchIcon className="h-4 w-4 text-purple-600" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-purple-900">
            {deteriorationType.nombre}
          </span>
          <Badge variant={"default"}>{"DETER-" + deteriorationType.id}</Badge>
          <Badge variant={"secondary"}>
            {"Nivel de Detectabilidad: " + deteriorationType.detectabilidad}
          </Badge>
        </div>
        <div className="flex gap-2">
          <span className="text-sm text-muted-foreground">
            Cantidad de Causas: {deteriorationType.cantCausas}
          </span>
          <span className="text-sm text-muted-foreground">
            Cantidad de Campos Afectados:{" "}
            {deteriorationType.cantCamposAfectados}
          </span>
        </div>
      </div>
    </div>
  );
}
