import { Cause } from "./causes";
import { DefinedFieldCreateDTO } from "./defined-fields";

export interface DeteriorationType {
  id: number;
  nombre: string;
  detectabilidad: number;
  cantCamposAfectados: number;
  cantCausas: number;
}

export interface DeteriorationTypeDetails {
  id: number;
  nombre: string;
  detectabilidad: number;
  cantCamposAfectados: number;
  cantCausas: number;
}

export interface DeteriorationTypeCreateDTO {
  nombre: string;
  detectabilidad: number;
  camposDefinidos: DefinedFieldCreateDTO[];
  causas: Cause[];
  materialConfig: {
    id: string;
  };
  camposAfectados: { id: string }[];
}
