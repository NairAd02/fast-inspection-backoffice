import { ConfigsFilters } from "@/sections/configs/filters/hooks/use-configs-filters";
import { ConfigEdit } from "@/sections/configs/form/edit/schemas/config-edit-schema";
import { ConfigCreate } from "@/sections/configs/form/new/schemas/config-create-schema";

export interface Config {
  version: number;
  nombre: string;
  descripcion: string;
  state: boolean;
  porcentajeCompletitud: number;
}

export interface ConfigDetails {
  version: number;
  nombre: string;
  descripcion: string;
  state: boolean;
  porcentajeCompletitud: number;
}

export interface ConfigCreateDTO {
  nombre: string;
  descripcion: string;
}

export interface ConfigEditDTO {
  nombre: string;
  descripcion: string;
}

export const convertConfigCreateDTO = (
  configCreate: Omit<ConfigCreate, "configReplicate">
): ConfigCreateDTO => {
  return { ...configCreate };
};

export const convertConfigEditDTO = (configEdit: ConfigEdit): ConfigEditDTO => {
  return { ...configEdit };
};

export interface ConfigsFiltersDTO {
  version?: number;
  nombre?: string;
}

export const convertConfigsFiltersDTO = (
  filters: ConfigsFilters
): ConfigsFiltersDTO => {
  return { ...filters };
};
