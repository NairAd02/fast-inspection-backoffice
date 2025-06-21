import { EdificationsFilters } from "@/sections/edifications/filters/hooks/use-edifications-filters";
import { Inspection } from "./inspections";
import { EdificationCreate } from "@/sections/edifications/form/new/schemas/edification-create-schema";

export interface Edification {
  id: number;
  nombre: string;
  direccion: string;
  coordX: number;
  coordY: number;
}

export interface EdificationDetails {
  id: number;
  nombre: string;
  direccion: string;
  coordX: number;
  coordY: number;
  inspecciones: {
    data: Inspection[];
  };
}

export interface EdificationCreateDTO {
  nombre: string;
  direccion: string;
  coordX: number;
  coordY: number;
}

export interface EdificationsFiltersDTO {
  nombre?: string;
  direccion?: string;
}

export const convertEdificationCreateDTO = (
  edification: EdificationCreate
): EdificationCreateDTO => {
  const { position, ...rest } = edification;
  return {
    ...rest,
    coordX: position.coordY,
    coordY: position.coordX,
  };
};

export const convertEdificationsFiltersDTO = (
  filters: EdificationsFilters
): EdificationsFiltersDTO => {
  return {
    ...filters,
  };
};
