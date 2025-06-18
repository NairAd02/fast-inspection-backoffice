import { CalculableIntervalIndicesFilters } from "@/sections/calculable-indices/calculable-interval-indices/filters/hooks/use-calculable-interval-indices-filters";
import { Calculos, TipoIndiceCalculable } from "./calculable-indices";
import { IndicatorIntervalCreateDTO } from "./indicator-interval";
import { CalculableIntervalIndiceCreate } from "@/sections/calculable-indices/calculable-interval-indices/form/new/schemas/calculable-interval-indice-create-schema";

export interface CalculableIntervalIndice {
  id: number;
  nombre: string;
  tipo: TipoIndiceCalculable;
  calculo: Calculos;
  configVersion: number;
}

export interface CalculableIntervalIndiceCreateDTO {
  nombre: string;
  indicadoresIntervalos: IndicatorIntervalCreateDTO[];
  calculo: Calculos;
  config: {
    version: string;
  };
}

export interface CalculableIntervalIndiceFiltersDTO {
  nombre?: string;
  versionConfig?: string;
}

export const convertCalculableIntervalIndiceCreateDTO = (
  calculableIntervalIndiceCreate: CalculableIntervalIndiceCreate,
  configVersion: string
): CalculableIntervalIndiceCreateDTO => {
  return {
    ...calculableIntervalIndiceCreate,
    config: {
      version: configVersion,
    },
  };
};

export const convertCalculableIntervalIndiceFiltersDTO = (
  filters: CalculableIntervalIndicesFilters
) => {
  return {
    ...filters,
  };
};
