import { Badge } from "@/components/ui/badge";
import { Subsystem } from "@/lib/types/subsystems";
import { CogIcon } from "lucide-react";
import React from "react";

interface Props {
  subsystem: Subsystem;
}

export default function SubsystemTreeItem({ subsystem }: Props) {
  return (
    <div className="flex items-center gap-3">
      <CogIcon className="h-4 w-4 text-green-600" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-green-900">{subsystem.nombre}</span>
          <Badge variant={"default"}>{"SUB-" + subsystem.id}</Badge>
          <Badge variant={"secondary"}>
            {"Cantidad de materiales: " + subsystem.cantMateriales}
          </Badge>
        </div>
      </div>
    </div>
  );
}
