import React from "react";
import {
  Building2,
  Hash,
  MapPin,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Shield,
  Minus,
} from "lucide-react";
import { EdificationDetails } from "@/lib/types/edifications";
import { getCriticalityLevel } from "@/lib/types/inspections";
import { formatDate } from "@/lib/format-date";
import EdificationDetailsInspectionHistory from "./edification-details-inspection-history/edification-details-inspection-history";

interface Props {
  edification: EdificationDetails;
}

export default function EdificationDetailsContainer({ edification }: Props) {
  const getInspectionTrend = () => {
    if (edification.inspecciones.data.length < 2) return null;

    const sortedInspections = [...edification.inspecciones.data].sort(
      (a, b) =>
        new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime()
    );

    const latest = sortedInspections[0];
    const previous = sortedInspections[1];

    const criticalityChange =
      latest.indiceCriticidad - previous.indiceCriticidad;
    const deteriorationChange = latest.cantDeterioros - previous.cantDeterioros;

    return { criticalityChange, deteriorationChange };
  };

  const trend = getInspectionTrend();

  const sortedInspections = [...edification.inspecciones.data].sort(
    (a, b) =>
      new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime()
  );

  const latestInspection = sortedInspections[0];
  const avgCriticality =
    edification.inspecciones.data.length > 0
      ? Math.round(
          edification.inspecciones.data.reduce(
            (sum, i) => sum + i.indiceCriticidad,
            0
          ) / edification.inspecciones.data.length
        )
      : 0;
  const totalDeteriorations = edification.inspecciones.data.reduce(
    (sum, i) => sum + i.cantDeterioros,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-2 bg-white">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-indigo-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                {edification.nombre}
              </h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Hash className="w-4 h-4" />
                <span>ID: {edification.id}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{edification.direccion}</span>
              </div>
            </div>
          </div>
          {latestInspection && (
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                getCriticalityLevel(latestInspection.indiceCriticidad).color
              }`}
            >
              {getCriticalityLevel(latestInspection.indiceCriticidad).icon}
              <span className="font-medium text-sm">
                {getCriticalityLevel(latestInspection.indiceCriticidad).level}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-slate-600" />
            </div>
            <span className="text-sm font-medium text-slate-600">
              Inspecciones
            </span>
          </div>
          <p className="text-slate-900 font-bold text-xl">
            {edification.inspecciones.data.length}
          </p>
          <p className="text-xs text-slate-500 mt-1">Total realizadas</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">
              Criticidad Promedio
            </span>
          </div>
          <p className="text-blue-900 font-bold text-xl">{avgCriticality}</p>
          <p className="text-xs text-blue-500 mt-1">
            {getCriticalityLevel(avgCriticality).level}
          </p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600">
              Deterioros Totales
            </span>
          </div>
          <p className="text-orange-900 font-bold text-xl">
            {totalDeteriorations}
          </p>
          <p className="text-xs text-orange-500 mt-1">Acumulados</p>
        </div>

        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-emerald-600">
              Última Inspección
            </span>
          </div>
          <p className="text-emerald-900 font-bold text-sm">
            {latestInspection
              ? formatDate(latestInspection.fechaInicio)
              : "N/A"}
          </p>
          <p className="text-xs text-emerald-500 mt-1">
            {latestInspection
              ? `Hace ${Math.ceil(
                  (Date.now() -
                    new Date(latestInspection.fechaInicio).getTime()) /
                    (1000 * 60 * 60 * 24)
                )} días`
              : "Sin datos"}
          </p>
        </div>
      </div>

      {/* Trend Analysis */}
      {trend && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100 mb-6">
          <h3 className="text-sm font-semibold text-purple-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Análisis de Tendencia
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">
                Cambio en Criticidad:
              </span>
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  trend.criticalityChange > 0
                    ? "bg-red-100 text-red-700"
                    : trend.criticalityChange < 0
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {trend.criticalityChange > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : trend.criticalityChange < 0 ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <Minus className="w-3 h-3" />
                )}
                <span>
                  {trend.criticalityChange > 0 ? "+" : ""}
                  {trend.criticalityChange}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">
                Cambio en Deterioros:
              </span>
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  trend.deteriorationChange > 0
                    ? "bg-red-100 text-red-700"
                    : trend.deteriorationChange < 0
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {trend.deteriorationChange > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : trend.deteriorationChange < 0 ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <Minus className="w-3 h-3" />
                )}
                <span>
                  {trend.deteriorationChange > 0 ? "+" : ""}
                  {trend.deteriorationChange}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inspections Section */}
      <EdificationDetailsInspectionHistory
        edificationId={edification.id.toString()}
      />

      {/* Building Status Summary */}
      {edification.inspecciones.data.length > 0 && (
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-6 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Estado General de la Edificación
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-600">
                {Math.max(
                  ...edification.inspecciones.data.map(
                    (i) => i.indiceCriticidad
                  )
                )}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Criticidad Máxima
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-600">
                {Math.min(
                  ...edification.inspecciones.data.map(
                    (i) => i.indiceCriticidad
                  )
                )}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Criticidad Mínima
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-600">
                {Math.max(
                  ...edification.inspecciones.data.map((i) => i.cantDeterioros)
                )}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Máx. Deterioros
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-600">
                {
                  edification.inspecciones.data.filter(
                    (i) => i.cantDeterioros === 0
                  ).length
                }
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Sin Deterioros
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
