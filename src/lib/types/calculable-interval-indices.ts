import { CalculableIntervalIndicesFilters } from "@/sections/calculable-indices/calculable-interval-indices/filters/hooks/use-calculable-interval-indices-filters";
import { Calculos, TipoIndiceCalculable } from "./calculable-indices";
import {
  IndicatorIntervalCreateDTO,
  IndicatorIntervalEditDTO,
} from "./indicator-interval";
import { CalculableIntervalIndiceCreate } from "@/sections/calculable-indices/calculable-interval-indices/form/new/schemas/calculable-interval-indice-create-schema";
import { CalculableIntervalIndiceEdit } from "@/sections/calculable-indices/calculable-interval-indices/form/edit/schemas/calculable-interval-indice-edit-schema";

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

export interface CalculableIntervalIndiceEditDTO {
  nombre: string;
  indicadoresIntervalos: IndicatorIntervalEditDTO[];
  calculo: Calculos;
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

export const convertCalculableIntervalIndiceEditDTO = (
  calculableIntervalIndiceEdit: CalculableIntervalIndiceEdit
): CalculableIntervalIndiceEditDTO => {
  return {
    ...calculableIntervalIndiceEdit,
  };
};

export const convertCalculableIntervalIndiceFiltersDTO = (
  filters: CalculableIntervalIndicesFilters
) => {
  return {
    ...filters,
  };
};
