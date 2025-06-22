import { InspectionSubsystem } from "./inspection-subsystems";
import { InspectionTool } from "./inspection-tools";

export interface InspectionSystem {
  _id: string;
  nombre: string;
  herramienta: InspectionTool;
  indiceCriticidad: number;
  cantDeterioros: number;
  subsistemas: InspectionSubsystem[];
}
