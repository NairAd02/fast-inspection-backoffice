import { SubsystemDetails } from "./subsystems";
import { Tool } from "./tools";

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
    id: number;
  };
  config: {
    version: number;
  };
}
