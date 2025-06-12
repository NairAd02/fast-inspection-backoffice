import { SubsystemCreate } from "@/sections/subsystems/form/new/schemas/subsystem-create-schema";
import { MaterialDetails } from "./materials";
import { SubsystemEdit } from "@/sections/subsystems/form/edit/schemas/subsystem-edit-schema";

export interface Subsystem {
  id: number;
  nombre: string;
  cantMateriales: number;
}

export interface SubsystemDetails {
  id: number;
  nombre: string;
  cantMateriales: number;
  materialesConfig: MaterialDetails[];
}

export interface SubsystemCreateDTO {
  nombre: string;
  sistemaConfig: {
    id: string;
  };
}

export interface SubsystemEditDTO {
  nombre: string;
}

export const convertSubsystemCreateDTO = (
  subsystemCreate: SubsystemCreate,
  systemId: string
): SubsystemCreateDTO => {
  return {
    ...subsystemCreate,
    sistemaConfig: { id: systemId },
  };
};

export const convertSubsystemEditDTO = (
  subsystemEdit: SubsystemEdit
): SubsystemEditDTO => {
  return {
    ...subsystemEdit,
  };
};
