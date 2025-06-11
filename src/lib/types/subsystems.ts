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
