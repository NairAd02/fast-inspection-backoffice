"use client";
import InspectionCard from "@/sections/inspections/components/inspection-card/inspection-card";
import InspectionCardSkeleton from "@/sections/inspections/components/inspection-card/inspection-card-skeleton/inspection-card-skeleton";
import useInspections from "@/sections/inspections/hooks/use-inspections";
import { ActivityIcon, BarChart3 } from "lucide-react";
import React from "react";

interface Props {
  edificationId: string;
}

export default function EdificationDetailsInspectionHistory({
  edificationId,
}: Props) {
  const { inspections, loadingData } = useInspections({
    defaultsFilters: {
      edificacionId: edificationId,
    },
  });

  if (loadingData) {
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Historial de Inspecciones
          </h2>
        </div>

        <div className="space-y-4">
          {[1].map((index) => (
            <InspectionCardSkeleton key={index} index={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-indigo-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Historial de Inspecciones
        </h2>
      </div>

      {inspections.length > 0 ? (
        <div className="space-y-4">
          {inspections.map((inspection, index) => (
            <InspectionCard
              key={inspection.id}
              inspection={inspection}
              isLatest={index === 0}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <ActivityIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Sin inspecciones registradas
          </h3>
          <p className="text-sm">
            No hay inspecciones disponibles para esta edificación
          </p>
        </div>
      )}
    </div>
  );
}
