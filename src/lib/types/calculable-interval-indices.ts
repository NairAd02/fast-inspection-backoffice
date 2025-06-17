import { CalculableIntervalIndicesFilters } from "@/sections/calculable-indices/calculable-interval-indices/filters/hooks/use-calculable-interval-indices-filters";
import { Calculos, TipoIndiceCalculable } from "./calculable-indices";

export interface CalculableIntervalIndice {
  id: number;
  nombre: string;
  tipo: TipoIndiceCalculable;
  calculo: Calculos;
  configVersion: number;
}

export interface CalculableIntervalIndiceFiltersDTO {
  nombre?: string;
  versionConfig?: string;
}

export const convertCalculableIntervalIndiceFiltersDTO = (
  filters: CalculableIntervalIndicesFilters
) => {
  return {
    ...filters,
  };
};
