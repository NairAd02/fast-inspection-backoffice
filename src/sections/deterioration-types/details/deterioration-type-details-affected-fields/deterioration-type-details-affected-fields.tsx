import { Badge } from "@/components/ui/badge";
import { DeteriorationTypeDetails } from "@/lib/types/deterioration-type";
import { getImportanceBadgeVariant } from "@/lib/types/fields";
import React from "react";

interface Props {
  deteriorationType: DeteriorationTypeDetails;
}

export default function DeteriorationTypeDetailsAffectedFields({
  deteriorationType,
}: Props) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Campos afectados</h3>
      {deteriorationType.camposAfectados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {deteriorationType.camposAfectados.map((field) => (
            <div
              key={field.id}
              className="border border-gray-200 rounded-md p-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{field.nombre}</h4>
                <Badge
                  color={getImportanceBadgeVariant(field.nivelImportancia)}
                  className="text-xs"
                >
                  Nivel {field.nivelImportancia}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">ID: {field.id}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-gray-500">No hay campos afectados definidos</p>
        </div>
      )}
    </div>
  );
}
