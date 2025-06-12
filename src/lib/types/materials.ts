import { MaterialCreate } from "@/sections/materials/form/new/schemas/material-create-schema";
import { DeteriorationType } from "./deterioration-type";

export interface Material {
  id: number;
  nombre: string;
  cantTiposDeterioros: number;
}

export interface MaterialDetails {
  id: number;
  nombre: string;
  cantTiposDeterioros: number;
  tiposDeteriorosConfig: DeteriorationType[];
}

export interface MaterialCreateDTO {
  nombre: string;
  subsistemaConfig: {
    id: string;
  };
}

export const convertMaterialCreateDTO = (
  materialCreate: MaterialCreate,
  subsystemId: string
): MaterialCreateDTO => {
  return {
    ...materialCreate,
    subsistemaConfig: { id: subsystemId },
  };
};
