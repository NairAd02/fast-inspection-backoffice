import { InspectionMaterial } from "./inspection-materials";

export interface InspectionSubsystem {
  _id: string;
  nombre: string;
  materiales: InspectionMaterial[];
  indiceCriticidad: number;
  cantDeterioros: number;
}
