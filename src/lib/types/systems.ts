import { SubsystemDetails } from "./subsystems";
import { Tool } from "./tools";

export interface SystemDetails {
  id: number;
  nombre: String;
  cantSubsistemas: number;
  herramienta: Tool;
  configVersion: number;
  subSistemasConfig: SubsystemDetails[];
}
