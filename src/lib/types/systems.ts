import { SubsystemDetails } from "./subsystems";
import { Tool } from "./tools";

export interface SystemDetails {
  id: number;
  nombre: string;
  cantSubsistemas: number;
  herramienta: Tool;
  configVersion: number;
  subSistemasConfig: SubsystemDetails[];
}
