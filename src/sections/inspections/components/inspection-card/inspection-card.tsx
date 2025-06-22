import NavigationComponent from "@/components/navigation-component/navigation-component";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format-date";
import {
  getCriticalityLevel,
  getDeteriorationLevel,
  Inspection,
} from "@/lib/types/inspections";
import { paths } from "@/routes/path";
import { Calendar, CheckCircle, Settings, XCircle } from "lucide-react";
import React from "react";

interface Props {
  inspection: Inspection;
  isLatest: boolean;
}

export default function InspectionCard({ inspection, isLatest }: Props) {
  const criticalityInfo = getCriticalityLevel(inspection.indiceCriticidad);
  const deteriorationInfo = getDeteriorationLevel(inspection.cantDeterioros);

  return (
    <div
      key={inspection.id}
      className={`p-5 rounded-lg border transition-all hover:shadow-md ${
        isLatest
          ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100"
          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex sm:flex-row flex-col items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900">
                Inspección #{inspection.id}
              </h3>
              {isLatest && (
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                  Más reciente
                </span>
              )}
            </div>
            <NavigationComponent
              href={paths.inspection({ id: inspection.id.toString() }).root}
            >
              <Button>Ver Detalles</Button>
            </NavigationComponent>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(inspection.fechaInicio)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings className="w-3 h-3" />
              <span>Config v{inspection.configVersion}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Criticality */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Índice de Criticidad
            </span>
            <div
              className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs font-medium border ${criticalityInfo.color}`}
            >
              {criticalityInfo.icon}
              <span>{criticalityInfo.level}</span>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {inspection.indiceCriticidad}
            </span>
            <span className="text-sm text-gray-500 mb-1">/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                inspection.indiceCriticidad >= 80
                  ? "bg-red-500"
                  : inspection.indiceCriticidad >= 60
                  ? "bg-orange-500"
                  : inspection.indiceCriticidad >= 40
                  ? "bg-yellow-500"
                  : inspection.indiceCriticidad >= 20
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${inspection.indiceCriticidad}%` }}
            ></div>
          </div>
        </div>

        {/* Deteriorations */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Cantidad de Deterioros
            </span>
            <div
              className={`px-2 py-1 rounded-lg text-xs font-medium ${deteriorationInfo.color}`}
            >
              {deteriorationInfo.level}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {inspection.cantDeterioros}
            </span>
            <span className="text-sm text-gray-500">detectados</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
            {inspection.cantDeterioros === 0 ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : (
              <XCircle className="w-3 h-3 text-red-500" />
            )}
            <span>
              {inspection.cantDeterioros === 0
                ? "Sin deterioros"
                : `${inspection.cantDeterioros} deterioro${
                    inspection.cantDeterioros > 1 ? "s" : ""
                  } encontrado${inspection.cantDeterioros > 1 ? "s" : ""}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
