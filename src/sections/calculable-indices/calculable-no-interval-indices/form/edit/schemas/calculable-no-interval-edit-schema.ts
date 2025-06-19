import { Calculos } from "@/lib/types/calculable-indices";
import { z } from "zod";
import {
  IndicatorNoIntervalEdit,
  indicatorNoIntervalEditSchema,
} from "./indicator-no-interval-edit-schema";

export interface CalculableNoIntervalIndiceEdit {
  nombre: string;
  calculo: Calculos;
  indicadoresSinIntervalos: IndicatorNoIntervalEdit[];
}

export const calculableNoIntervalIndiceEditSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre de la configuración es requerido" }),
  calculo: z.enum([
    Calculos.Criticidad,
    Calculos.Detectabilidad,
    Calculos.Frecuencia,
    Calculos.Impacto,
  ]),
  indicadoresSinIntervalos: z.array(indicatorNoIntervalEditSchema).min(1, {
    message: "Se debe crear al menos un intervalo",
  }),
});
