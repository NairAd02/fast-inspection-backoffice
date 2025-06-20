import React from "react";
import {
  Calculator,
  Hash,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Activity,
  Zap,
} from "lucide-react";
import { CalculableNoIntervalIndiceDetails } from "@/lib/types/calculable-no-interval-indices";
import { Calculos } from "@/lib/types/calculable-indices";
import InfoCardsSection from "./info-cards-section/info-cards-section";

interface Props {
  calculableNoIntervalIndice: CalculableNoIntervalIndiceDetails;
}

export function CalculableNoIntervalIndiceDetailsContainer({
  calculableNoIntervalIndice,
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

  const getValueColor = (valor: number) => {
    if (valor >= 80) return "text-red-600 bg-red-50";
    if (valor >= 60) return "text-orange-600 bg-orange-50";
    if (valor >= 40) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {calculableNoIntervalIndice.nombre}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Hash className="w-4 h-4" />
              <span>ID: {calculableNoIntervalIndice.id}</span>
            </div>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getCalculoColor(
              calculableNoIntervalIndice.calculo
            )}`}
          >
            {getCalculoIcon(calculableNoIntervalIndice.calculo)}
            <span className="font-medium text-sm">
              {calculableNoIntervalIndice.calculo}
            </span>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <InfoCardsSection
        calculableNoIntervalIndice={calculableNoIntervalIndice}
      />

      {/* Indicators Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Indicadores Sin Intervalos
          </h2>
        </div>

        {calculableNoIntervalIndice.indicadoresSinIntervalos.length > 0 ? (
          <div className="space-y-3">
            {calculableNoIntervalIndice.indicadoresSinIntervalos.map(
              (indicator) => (
                <div
                  key={indicator.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
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
                    className={`px-3 py-2 rounded-lg font-bold text-sm ${getValueColor(
                      indicator.valor
                    )}`}
                  >
                    {indicator.valor}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No hay indicadores disponibles</p>
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      {calculableNoIntervalIndice.indicadoresSinIntervalos.length > 0 && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
          <h3 className="text-sm font-semibold text-indigo-900 mb-4">
            Resumen Estadístico
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {Math.max(
                  ...calculableNoIntervalIndice.indicadoresSinIntervalos.map(
                    (i) => i.valor
                  )
                )}
              </div>
              <div className="text-xs text-indigo-500 font-medium">Máximo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.min(
                  ...calculableNoIntervalIndice.indicadoresSinIntervalos.map(
                    (i) => i.valor
                  )
                )}
              </div>
              <div className="text-xs text-purple-500 font-medium">Mínimo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">
                {Math.round(
                  calculableNoIntervalIndice.indicadoresSinIntervalos.reduce(
                    (sum, i) => sum + i.valor,
                    0
                  ) / calculableNoIntervalIndice.indicadoresSinIntervalos.length
                )}
              </div>
              <div className="text-xs text-pink-500 font-medium">Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">
                {calculableNoIntervalIndice.indicadoresSinIntervalos.reduce(
                  (sum, i) => sum + i.valor,
                  0
                )}
              </div>
              <div className="text-xs text-cyan-500 font-medium">Total</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
