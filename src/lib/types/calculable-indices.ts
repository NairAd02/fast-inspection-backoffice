export enum TipoIndiceCalculable {
  InidiceCalculableIntervalo = "indiceCalculableIntervalo",
  IndiceCalcuableSinIntervalo = "indiceCalculableSinIntervalo",
}

export const tiposIndiceCalculableMap: Map<
  TipoIndiceCalculable,
  {
    name: string;
    color:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning";
  }
> = new Map([
  [
    TipoIndiceCalculable.InidiceCalculableIntervalo,
    { name: "Indice Calculable con Intervalo", color: "primary" },
  ],
  [
    TipoIndiceCalculable.IndiceCalcuableSinIntervalo,
    { name: "Indice Calculable sin Intervalo", color: "primary" },
  ],
]);

export enum Calculos {
  Detectabilidad = "Detectabilidad",
  Impacto = "Impacto",
  Frecuencia = "Frecuencia",
  Criticidad = "Criticidad",
}

export const calculosMap: Map<
  Calculos,
  {
    name: string;
    color:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning";
  }
> = new Map([
  [Calculos.Criticidad, { name: "Criticidad", color: "primary" }],
  [Calculos.Detectabilidad, { name: "Detectabilidad", color: "primary" }],
  [Calculos.Frecuencia, { name: "Frecuencia", color: "primary" }],
  [Calculos.Impacto, { name: "Impacto", color: "primary" }],
]);
