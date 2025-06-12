import { SubsystemCreate } from "@/sections/subsystems/form/new/schemas/subsystem-create-schema";
import { MaterialDetails } from "./materials";

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

export const convertSubsystemCreateDTO = (
  subsystemCreate: SubsystemCreate,
  systemId: string
): SubsystemCreateDTO => {
  return {
    ...subsystemCreate,
    sistemaConfig: { id: systemId },
  };
};
