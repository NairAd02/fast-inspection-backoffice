import { SystemCreate } from "@/sections/systems/form/new/schemas/system-create-schema";
import { SubsystemDetails } from "./subsystems";
import { Tool } from "./tools";
import { SystemEdit } from "@/sections/systems/form/edit/schemas/system-edit-schema";

export interface System {
  id: number;
  nombre: string;
  cantSubsistemas: number;
  herramienta: Tool;
}

export interface SystemDetails {
  id: number;
  nombre: string;
  cantSubsistemas: number;
  herramienta: Tool;
  configVersion: number;
  subSistemasConfig: SubsystemDetails[];
}

export interface SystemCreateDTO {
  nombre: string;
  herramienta: {
    id: string;
  };
  config: {
    version: string;
  };
}

export interface SystemEditDTO {
  nombre: string;
}

export const convertSystemCreateDTO = (
  system: SystemCreate,
  configVersion: string
): SystemCreateDTO => {
  return {
    ...system,
    herramienta: { id: system.herramienta },
    config: { version: configVersion },
  };
};

export const convertSystemEditDTO = (system: SystemEdit): SystemEditDTO => {
  return {
    ...system,
  };
};
