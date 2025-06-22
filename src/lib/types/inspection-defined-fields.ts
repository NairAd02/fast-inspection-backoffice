import { DefinedFieldTypes } from "./defined-fields";

export interface InspectionDefinedField {
  _id: string;
  nombre: string;
  tipo: DefinedFieldTypes;
  valor: string;
}
