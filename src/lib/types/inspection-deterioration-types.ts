import { Deterioration } from "./deteriorations";
import { InspectionCriticalityIndex } from "./inspection-criticality-indexs";
import { InspectionField } from "./inspection-fields";

export interface InspectionDeteriorationType {
  _id: string;
  nombre: string;
  deterioros: Deterioration[]
  indiceCriticidad: InspectionCriticalityIndex;
  cantDeterioros: number;
  detectabilidad: number;
  camposAfectados: InspectionField[];
}
