import { TipoHerramienta } from "./tools";

export interface InspectionTool {
  id: string;
  nombre: string;
  tipo: TipoHerramienta;
}
