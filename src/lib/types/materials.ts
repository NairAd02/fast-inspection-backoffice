import { DeteriorationType } from "./deterioration-type";

export interface Material {
  id: number;
  nombre: string;
  cantTiposDeterioros: number;
}

export interface MaterialDetails {
  id: number;
  nombre: string;
  cantTiposDeterioros: number;
  tiposDeteriorosConfig: DeteriorationType[];
}
