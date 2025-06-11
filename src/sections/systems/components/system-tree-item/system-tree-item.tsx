import { Badge } from "@/components/ui/badge";
import { System } from "@/lib/types/systems";
import { BuildingIcon } from "lucide-react";
import React from "react";

interface Props {
  system: System;
}

export default function SystemTreeItem({ system }: Props) {
  return (
    <div className="flex items-center gap-3">
      <BuildingIcon className="h-5 w-5 text-blue-600" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-blue-900">{system.nombre}</span>
          <Badge variant={"default"}>{"S-" + system.id}</Badge>
          <Badge variant={"secondary"}>
            {"Cantidad de subsistemas: " + system.cantSubsistemas}
          </Badge>
        </div>
        <span className="text-sm text-muted-foreground">
          Herramienta: {system.herramienta.nombre} ({system.herramienta.tipo})
        </span>
      </div>
    </div>
  );
}
