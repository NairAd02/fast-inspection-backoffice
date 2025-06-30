import { EdificationsFilters } from "@/sections/edifications/filters/hooks/use-edifications-filters";
import { Inspection } from "./inspections";
import { EdificationCreate } from "@/sections/edifications/form/new/schemas/edification-create-schema";
import { EdificationEdit } from "@/sections/edifications/form/edit/schemas/edification-edit-schema";

export interface Edification {
  id: number;
  nombre: string;
  direccion: string;
  coordX: number;
  coordY: number;
  criticidad: number;
  cantDeterioros: number;
}

export interface EdificationDetails {
  id: number;
  nombre: string;
  direccion: string;
  coordX: number;
  coordY: number;
  criticidad: number;
  cantDeterioros: number;
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

export interface EdificationEditDTO {
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

export const convertEdificationEditDTO = (
  edification: EdificationEdit
): EdificationEditDTO => {
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

export const getEdificationCriticalityLabel = (criticidad: number) => {
  if (criticidad <= 2) return "Bajo";
  if (criticidad <= 10) return "Medio";
  if (criticidad <= 40) return "Alto";
  return "Muy Alto";
};

export const getEdificationCriticalitColor = (criticidad: number) => {
  if (criticidad <= 2) return "bg-green-500";
  if (criticidad <= 10) return "bg-yellow-500";
  if (criticidad <= 40) return "bg-red-500";
  return "bg-red-500";
};
