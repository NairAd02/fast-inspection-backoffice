import React from "react";
import {
  Calculator,
  Hash,
  Tag,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Activity,
  Zap,
  Target,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import { CalculableIntervalIndiceDetails } from "@/lib/types/calculable-interval-indices";
import { Calculos } from "@/lib/types/calculable-indices";

interface Props {
  calculableIntervalIndiceDetails: CalculableIntervalIndiceDetails;
}

export default function CalculableIntervalDetailsContainer({
  calculableIntervalIndiceDetails,
}: Props) {
  const getCalculoIcon = (calculo: Calculos) => {
    switch (calculo) {
      case Calculos.Detectabilidad:
        return <Activity className="w-5 h-5" />;
      case Calculos.Impacto:
        return <AlertTriangle className="w-5 h-5" />;
      case Calculos.Frecuencia:
        return <TrendingUp className="w-5 h-5" />;
      case Calculos.Criticidad:
        return <Zap className="w-5 h-5" />;
      default:
        return <Calculator className="w-5 h-5" />;
    }
  };

  const getCalculoColor = (calculo: Calculos) => {
    switch (calculo) {
      case Calculos.Detectabilidad:
        return "bg-blue-50 text-blue-700 border-blue-200";
      case Calculos.Impacto:
        return "bg-red-50 text-red-700 border-red-200";
      case Calculos.Frecuencia:
        return "bg-green-50 text-green-700 border-green-200";
      case Calculos.Criticidad:
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getIntervalStatus = (
    valor: number,
    limiteInferior: number,
    limiteSuperior?: number
  ) => {
    if (limiteSuperior === undefined) {
      // Solo límite inferior
      if (valor >= limiteInferior) {
        return {
          status: "above",
          color: "text-green-600 bg-green-50",
          icon: <ArrowUp className="w-3 h-3" />,
        };
      } else {
        return {
          status: "below",
          color: "text-red-600 bg-red-50",
          icon: <ArrowDown className="w-3 h-3" />,
        };
      }
    } else {
      // Rango completo
      if (valor >= limiteInferior && valor <= limiteSuperior) {
        return {
          status: "within",
          color: "text-green-600 bg-green-50",
          icon: <Target className="w-3 h-3" />,
        };
      } else if (valor < limiteInferior) {
        return {
          status: "below",
          color: "text-red-600 bg-red-50",
          icon: <ArrowDown className="w-3 h-3" />,
        };
      } else {
        return {
          status: "above",
          color: "text-orange-600 bg-orange-50",
          icon: <ArrowUp className="w-3 h-3" />,
        };
      }
    }
  };

  const getProgressPercentage = (
    valor: number,
    limiteInferior: number,
    limiteSuperior?: number
  ) => {
    if (limiteSuperior === undefined) {
      // Para límites solo inferiores, mostramos progreso basado en qué tan por encima está
      const range = Math.max(limiteInferior * 0.5, 10); // Rango arbitrario para visualización
      return Math.min((valor / (limiteInferior + range)) * 100, 100);
    } else {
      // Para rangos completos
      const range = limiteSuperior - limiteInferior;
      if (range === 0) return 100;
      return Math.min(
        Math.max(((valor - limiteInferior) / range) * 100, 0),
        100
      );
    }
  };

  const getProgressColor = (
    valor: number,
    limiteInferior: number,
    limiteSuperior?: number
  ) => {
    const status = getIntervalStatus(valor, limiteInferior, limiteSuperior);
    switch (status.status) {
      case "within":
        return "bg-green-500";
      case "above":
        return limiteSuperior === undefined ? "bg-green-500" : "bg-orange-500";
      case "below":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 bg-white">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {calculableIntervalIndiceDetails.nombre}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Hash className="w-4 h-4" />
              <span>ID: {calculableIntervalIndiceDetails.id}</span>
            </div>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getCalculoColor(
              calculableIntervalIndiceDetails.calculo
            )}`}
          >
            {getCalculoIcon(calculableIntervalIndiceDetails.calculo)}
            <span className="font-medium text-sm">
              {calculableIntervalIndiceDetails.calculo}
            </span>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Tag className="w-4 h-4 text-slate-600" />
            </div>
            <span className="text-sm font-medium text-slate-600">Tipo</span>
          </div>
          <p className="text-slate-900 font-semibold text-sm">
            {calculableIntervalIndiceDetails.tipo ===
            "indiceCalculableIntervalo"
              ? "Con Intervalo"
              : "Sin Intervalo"}
          </p>
        </div>

        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-emerald-600">
              Indicadores
            </span>
          </div>
          <p className="text-emerald-900 font-semibold text-sm">
            {calculableIntervalIndiceDetails.indicadoresIntervalos.length}{" "}
            elementos
          </p>
        </div>
      </div>

      {/* Indicators Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Indicadores con Intervalos
          </h2>
        </div>

        {calculableIntervalIndiceDetails.indicadoresIntervalos.length > 0 ? (
          <div className="space-y-4">
            {calculableIntervalIndiceDetails.indicadoresIntervalos.map(
              (indicator) => {
                const intervalStatus = getIntervalStatus(
                  indicator.valor,
                  indicator.limiteInferior,
                  indicator.limiteSuperior
                );
                const progressPercentage = getProgressPercentage(
                  indicator.valor,
                  indicator.limiteInferior,
                  indicator.limiteSuperior
                );
                const progressColor = getProgressColor(
                  indicator.valor,
                  indicator.limiteInferior,
                  indicator.limiteSuperior
                );

                return (
                  <div
                    key={indicator.id}
                    className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {indicator.nombre}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Hash className="w-3 h-3" />
                          <span>ID: {indicator.id}</span>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm ${intervalStatus.color}`}
                      >
                        {intervalStatus.icon}
                        <span>{indicator.valor}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Interval Information */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <ArrowDown className="w-3 h-3" />
                          <span>Mín: {indicator.limiteInferior}</span>
                        </div>
                        {indicator.limiteSuperior !== undefined ? (
                          <div className="flex items-center gap-1 text-gray-600">
                            <ArrowUp className="w-3 h-3" />
                            <span>Máx: {indicator.limiteSuperior}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-gray-600">
                            <Minus className="w-3 h-3" />
                            <span>Sin límite superior</span>
                          </div>
                        )}
                      </div>
                      <div className="text-gray-500">
                        Rango:{" "}
                        {indicator.limiteSuperior !== undefined
                          ? `${indicator.limiteInferior} - ${indicator.limiteSuperior}`
                          : `≥ ${indicator.limiteInferior}`}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Target className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No hay indicadores disponibles</p>
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      {calculableIntervalIndiceDetails.indicadoresIntervalos.length > 0 && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
          <h3 className="text-sm font-semibold text-indigo-900 mb-4">
            Resumen Estadístico
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {Math.max(
                  ...calculableIntervalIndiceDetails.indicadoresIntervalos.map(
                    (i) => i.valor
                  )
                )}
              </div>
              <div className="text-xs text-indigo-500 font-medium">
                Valor Máximo
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.min(
                  ...calculableIntervalIndiceDetails.indicadoresIntervalos.map(
                    (i) => i.valor
                  )
                )}
              </div>
              <div className="text-xs text-purple-500 font-medium">
                Valor Mínimo
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">
                {Math.round(
                  calculableIntervalIndiceDetails.indicadoresIntervalos.reduce(
                    (sum, i) => sum + i.valor,
                    0
                  ) /
                    calculableIntervalIndiceDetails.indicadoresIntervalos.length
                )}
              </div>
              <div className="text-xs text-pink-500 font-medium">Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">
                {
                  calculableIntervalIndiceDetails.indicadoresIntervalos.filter(
                    (i) => {
                      const status = getIntervalStatus(
                        i.valor,
                        i.limiteInferior,
                        i.limiteSuperior
                      );
                      return (
                        status.status === "within" ||
                        (status.status === "above" &&
                          i.limiteSuperior === undefined)
                      );
                    }
                  ).length
                }
              </div>
              <div className="text-xs text-cyan-500 font-medium">En Rango</div>
            </div>
          </div>

          {/* Compliance Summary */}
          <div className="border-t border-indigo-200 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-indigo-700 font-medium">
                Estado de Cumplimiento:
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 text-xs">
                    {
                      calculableIntervalIndiceDetails.indicadoresIntervalos.filter(
                        (i) => {
                          const status = getIntervalStatus(
                            i.valor,
                            i.limiteInferior,
                            i.limiteSuperior
                          );
                          return (
                            status.status === "within" ||
                            (status.status === "above" &&
                              i.limiteSuperior === undefined)
                          );
                        }
                      ).length
                    }{" "}
                    En rango
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-700 text-xs">
                    {
                      calculableIntervalIndiceDetails.indicadoresIntervalos.filter(
                        (i) => {
                          const status = getIntervalStatus(
                            i.valor,
                            i.limiteInferior,
                            i.limiteSuperior
                          );
                          return status.status === "below";
                        }
                      ).length
                    }{" "}
                    Fuera de rango
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-700 text-xs">
                    {
                      calculableIntervalIndiceDetails.indicadoresIntervalos.filter(
                        (i) => {
                          const status = getIntervalStatus(
                            i.valor,
                            i.limiteInferior,
                            i.limiteSuperior
                          );
                          return (
                            status.status === "above" &&
                            i.limiteSuperior !== undefined
                          );
                        }
                      ).length
                    }{" "}
                    Excedido
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
