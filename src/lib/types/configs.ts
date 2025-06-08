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

export const convertConfigCreateDTO = (
  configCreate: ConfigCreate
): ConfigCreateDTO => {
  return { ...configCreate };
};
