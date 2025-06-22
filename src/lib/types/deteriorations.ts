import { InspectionDefinedField } from "./inspection-defined-fields";

export interface Deterioration {
  _id: string;
  codigo: string;
  camposDefinidos: InspectionDefinedField[];
}
