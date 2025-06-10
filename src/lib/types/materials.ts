import { DeteriorationType } from "./deterioration-type";

export interface MaterialDetails {
  id: number;
  nombre: string;
  cantTiposDeterioros: number;
  tiposDeteriorosConfig: DeteriorationType[];
}
