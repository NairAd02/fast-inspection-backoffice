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
