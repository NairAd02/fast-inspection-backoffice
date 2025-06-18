import { CalculableNoIntervalIndicesFilters } from "@/sections/calculable-indices/calculable-no-interval-indices/filters/hooks/use-calculable-no-interval-indices-filters";
import { Calculos, TipoIndiceCalculable } from "./calculable-indices";
import {
  IndicatorNoInterval,
  IndicatorNoIntervalCreateDTO,
  IndicatorNoIntervalEditDTO,
} from "./indicator-no-interval";
import { CalculableNoIntervalIndiceCreate } from "@/sections/calculable-indices/calculable-no-interval-indices/form/new/schemas/calculable-no-interval-indice-create-schema";
import { CalculableNoIntervalIndiceEdit } from "@/sections/calculable-indices/calculable-no-interval-indices/form/edit/schemas/calculable-no-interval-edit-schema";

export interface CalculableNoIntervalIndice {
  id: number;
  nombre: string;
  tipo: TipoIndiceCalculable;
  calculo: Calculos;
  configVersion: number;
}

export interface CalculableNoIntervalIndiceDetails {
  id: number;
  nombre: string;
  tipo: TipoIndiceCalculable;
  calculo: Calculos;
  configVersion: number;
  indicadoresSinIntervalos: IndicatorNoInterval[];
}

export interface CalculableNoIntervalIndiceCreateDTO {
  nombre: string;
  indicadoresSinIntervalos: IndicatorNoIntervalCreateDTO[];
  calculo: Calculos;
  config: {
    version: string;
  };
}

export interface CalculableNoIntervalIndiceEditDTO {
  nombre: string;
  indicadoresSinIntervalo: IndicatorNoIntervalEditDTO[];
  calculo: Calculos;
}

export interface CalculableNoIntervalIndiceFiltersDTO {
  nombre?: string;
  versionConfig?: string;
}

export const convertCalculableNoIntervalIndiceCreateDTO = (
  calculableNoIntervalIndiceCreate: CalculableNoIntervalIndiceCreate,
  configVersion: string
): CalculableNoIntervalIndiceCreateDTO => {
  return {
    ...calculableNoIntervalIndiceCreate,
    config: {
      version: configVersion,
    },
  };
};

export const convertCalculableNoIntervalIndiceEditDTO = (
  calculableNoIntervalIndiceEdit: CalculableNoIntervalIndiceEdit
): CalculableNoIntervalIndiceEditDTO => {
  return {
    ...calculableNoIntervalIndiceEdit,
    indicadoresSinIntervalo:
      calculableNoIntervalIndiceEdit.indicadoresSinIntervalos,
  };
};

export const convertCalculableNoIntervalIndiceFiltersDTO = (
  filters: CalculableNoIntervalIndicesFilters
) => {
  return {
    ...filters,
  };
};
