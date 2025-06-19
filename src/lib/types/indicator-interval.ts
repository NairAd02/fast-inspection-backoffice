export interface IndicatorInterval {
  id: number;
  nombre: string;
  valor: number;
  limiteInferior: number;
  limiteSuperior?: number;
}

export interface IndicatorIntervalCreateDTO {
  nombre: string;
  valor: number;
  limiteInferior: number;
  limiteSuperior?: number;
}

export interface IndicatorIntervalEditDTO {
  nombre: string;
  valor: number;
  limiteInferior: number;
  limiteSuperior?: number;
}
