import { Badge } from "@/components/ui/badge";
import { Material } from "@/lib/types/materials";
import { PackageIcon } from "lucide-react";
import React from "react";

interface Props {
  material: Material;
}

export default function MaterialTreeItem({ material }: Props) {
  return (
    <div className="flex items-center gap-3">
      <PackageIcon className="h-4 w-4 text-orange-600" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-orange-900">{material.nombre}</span>
          <Badge variant={"default"}>{"MAT-" + material.id}</Badge>
          <Badge variant={"secondary"}>
            {"Cantidad de tipos de deterioros: " + material.cantTiposDeterioros}
          </Badge>
        </div>
      </div>
    </div>
  );
}
