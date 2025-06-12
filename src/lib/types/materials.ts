import { MaterialCreate } from "@/sections/materials/form/new/schemas/material-create-schema";
import { DeteriorationType } from "./deterioration-type";
import { MaterialEdit } from "@/sections/materials/form/edit/schemas/material-edit-schema";

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

export interface MaterialEditDTO {
  nombre: string;
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

export const convertMaterialEditDTO = (
  materialEdit: MaterialEdit
): MaterialEditDTO => {
  return {
    ...materialEdit,
  };
};
