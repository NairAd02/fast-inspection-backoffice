import { MaterialDetails } from "./materials";

export interface SubsystemDetails {
  id: number;
  nombre: string;
  cantMateriales: number;
  materialesConfig: MaterialDetails[];
}
