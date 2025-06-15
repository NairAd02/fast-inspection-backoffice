import { Badge } from "@/components/ui/badge";
import { DeteriorationTypeDetails } from "@/lib/types/deterioration-type";
import { AlertTriangleIcon } from "lucide-react";
import React from "react";

interface Props {
  deteriorationType: DeteriorationTypeDetails;
}

export default function DeteriorationTypeDetailsHeader({
  deteriorationType,
}: Props) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold text-gray-900">
          {deteriorationType.nombre}
        </h2>
        <Badge variant="outline" className="bg-gray-100">
          <AlertTriangleIcon className="h-3.5 w-3.5 mr-1" />
          Tipo de Deterioro
        </Badge>
      </div>
      <p className="text-sm text-gray-500">ID: {deteriorationType.id}</p>
    </div>
  );
}
