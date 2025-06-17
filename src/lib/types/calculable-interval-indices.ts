import { Calculos, TipoIndiceCalculable } from "./calculable-indices";

export interface CalculableIntervalIndice {
  id: number;
  nombre: string;
  tipo: TipoIndiceCalculable;
  calculo: Calculos;
  configVersion: number;
}
