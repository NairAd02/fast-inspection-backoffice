import {
  averageImportance,
  criticalFields,
  highImportanceFields,
  lowImportanceFields,
  mediumImportanceFields,
  ToolDetails,
} from "@/lib/types/tools";
import { SettingsIcon, TargetIcon } from "lucide-react";
import React from "react";

interface Props {
  tool: ToolDetails;
}

export default function ToolDetailsStatistics({ tool }: Props) {
  return (
    <div className="my-6">
      <h3 className="text-lg font-medium mb-4">Estadísticas generales</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <SettingsIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-500">
              Total Campos
            </span>
          </div>
          <span className="text-lg font-semibold">{tool.campos.length}</span>
        </div>

        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <TargetIcon className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-500">
              Importancia Promedio
            </span>
          </div>
          <span className="text-lg font-semibold text-blue-600">
            {averageImportance(tool)}
          </span>
        </div>

        <div className="bg-orange-50 p-4 rounded-md border border-orange-200">
          <div className="flex items-center gap-2 mb-1">
            <TargetIcon className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-500">
              Campos de Alta Importancia
            </span>
          </div>
          <span className="text-lg font-semibold text-orange-600">
            {highImportanceFields(tool)}
          </span>
        </div>

        <div className="bg-red-50 p-4 rounded-md border border-red-200">
          <div className="flex items-center gap-2 mb-1">
            <TargetIcon className="h-4 w-4 text-orange-300" />
            <span className="text-sm font-medium text-gray-500">
              Campos de Mediana Importancia
            </span>
          </div>
          <span className="text-lg font-semibold text-red-600">
            {mediumImportanceFields(tool)}
          </span>
        </div>
      </div>
    </div>
  );
}
