import { DeteriorationTypeDetails } from "@/lib/types/deterioration-type";
import React from "react";

interface Props {
  deteriorationType: DeteriorationTypeDetails;
}

export default function DeteriorationTypeCauses({ deteriorationType }: Props) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Causas asociadas</h3>
      {deteriorationType.causas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {deteriorationType.causas.map((cause) => (
            <div
              key={cause.id}
              className="border border-gray-200 rounded-md p-3"
            >
              <h4 className="font-medium text-gray-900">{cause.nombre}</h4>
              <p className="text-sm text-gray-500 mt-1">ID: {cause.id}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-gray-500">No hay causas asociadas</p>
        </div>
      )}
    </div>
  );
}
