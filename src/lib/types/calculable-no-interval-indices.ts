import { CalculableNoIntervalIndicesFilters } from "@/sections/calculable-indices/calculable-no-interval-indices/filters/hooks/use-calculable-no-interval-indices-filters";
import { Calculos, TipoIndiceCalculable } from "./calculable-indices";

export interface CalculableNoIntervalIndice {
  id: number;
  nombre: string;
  tipo: TipoIndiceCalculable;
  calculo: Calculos;
  configVersion: number;
}

export interface CalculableNoIntervalIndiceFiltersDTO {
  nombre?: string;
  versionConfig?: string;
}

export const convertCalculableNoIntervalIndiceFiltersDTO = (
  filters: CalculableNoIntervalIndicesFilters
) => {
  return {
    ...filters,
  };
};
