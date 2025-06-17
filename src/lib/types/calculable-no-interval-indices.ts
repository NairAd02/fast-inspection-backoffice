import { Calculos, TipoIndiceCalculable } from "./calculable-indices";

export interface CalculableNoIntervalIndice {
  id: number;
  nombre: string;
  tipo: TipoIndiceCalculable;
  calculo: Calculos;
  configVersion: number;
}
