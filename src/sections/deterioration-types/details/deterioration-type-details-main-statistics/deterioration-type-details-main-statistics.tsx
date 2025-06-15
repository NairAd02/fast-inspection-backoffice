import { Badge } from "@/components/ui/badge";
import {
  DeteriorationTypeDetails,
  getDetectabilityLevel,
} from "@/lib/types/deterioration-type";
import {
  AlertTriangleIcon,
  List,
  SettingsIcon,
  TargetIcon,
} from "lucide-react";
import React from "react";

interface Props {
  deteriorationType: DeteriorationTypeDetails;
}

export default function DeteriorationTypeDetailsMainStatistics({
  deteriorationType,
}: Props) {
  const detectabilityInfo = getDetectabilityLevel(
    deteriorationType.detectabilidad
  );
  return (
    <div className="my-6 flex flex-col gap-4">
      <h3 className="text-lg font-medium mb-4">Información general</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <TargetIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-500">
              Detectabilidad
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">
              {deteriorationType.detectabilidad}
            </span>
            <Badge color={detectabilityInfo.variant} className="text-xs">
              {detectabilityInfo.text}
            </Badge>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <SettingsIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-500">
              Campos Afectados
            </span>
          </div>
          <span className="text-lg font-semibold">
            {deteriorationType.cantCamposAfectados ||
              deteriorationType.camposAfectados.length}
          </span>
        </div>

        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <List className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-500">
              Campos Definidos
            </span>
          </div>
          <span className="text-lg font-semibold">
            {deteriorationType.camposDefinidos.length}
          </span>
        </div>

        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangleIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-500">Causas</span>
          </div>
          <span className="text-lg font-semibold">
            {deteriorationType.cantCausas || deteriorationType.causas.length}
          </span>
        </div>
      </div>
    </div>
  );
}
