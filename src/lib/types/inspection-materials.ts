import { InspectionDeteriorationType } from "./inspection-deterioration-types";

export interface InspectionMaterial {
  _id: string;
  id: string;
  nombre: string;
  tiposDeterioros: InspectionDeteriorationType[];
  indiceCriticidad: number;
  cantDeterioros: number;
}
