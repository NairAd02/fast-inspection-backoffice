import { InspectionsFilters } from "@/sections/inspections/filters/hooks/use-inspections-filters";
import {
  AlertTriangle,
  CheckCircle,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export interface Inspection {
  id: number;
  fechaInicio: string;
  configVersion: number;
  indiceCriticidad: number;
  cantDeterioros: number;
}

export interface InspectionFiltersDTO {
  edificacionId?: string;
  configId?: string;
}

export const convertInspectionsFiltersDTO = (
  filters: InspectionsFilters
): InspectionFiltersDTO => {
  return { ...filters };
};

export const getCriticalityLevel = (indice: number) => {
  if (indice >= 80)
    return {
      level: "Crítico",
      color: "text-red-600 bg-red-50 border-red-200",
      icon: <AlertTriangle className="w-4 h-4" />,
    };
  if (indice >= 60)
    return {
      level: "Alto",
      color: "text-orange-600 bg-orange-50 border-orange-200",
      icon: <TrendingUp className="w-4 h-4" />,
    };
  if (indice >= 40)
    return {
      level: "Medio",
      color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      icon: <Minus className="w-4 h-4" />,
    };
  if (indice >= 20)
    return {
      level: "Bajo",
      color: "text-blue-600 bg-blue-50 border-blue-200",
      icon: <TrendingDown className="w-4 h-4" />,
    };
  return {
    level: "Mínimo",
    color: "text-green-600 bg-green-50 border-green-200",
    icon: <CheckCircle className="w-4 h-4" />,
  };
};

export const getDeteriorationLevel = (cantidad: number) => {
  if (cantidad >= 20)
    return { level: "Severo", color: "text-red-600 bg-red-50" };
  if (cantidad >= 10)
    return { level: "Moderado", color: "text-orange-600 bg-orange-50" };
  if (cantidad >= 5)
    return { level: "Leve", color: "text-yellow-600 bg-yellow-50" };
  if (cantidad > 0)
    return { level: "Mínimo", color: "text-blue-600 bg-blue-50" };
  return { level: "Ninguno", color: "text-green-600 bg-green-50" };
};
