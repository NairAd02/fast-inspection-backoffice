import { EdificationsFilters } from "@/sections/edifications/filters/hooks/use-edifications-filters";
import { Inspection } from "./inspections";

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

export interface EdificationsFiltersDTO {
  nombre?: string;
  direccion?: string;
}

export const convertEdificationsFiltersDTO = (
  filters: EdificationsFilters
): EdificationsFiltersDTO => {
  return {
    ...filters,
  };
};
