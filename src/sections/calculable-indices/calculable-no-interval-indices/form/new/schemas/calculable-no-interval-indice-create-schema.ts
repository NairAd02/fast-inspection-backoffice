import { Calculos } from "@/lib/types/calculable-indices";
import { z } from "zod";
import {
  IndicatorNoIntervalCreate,
  indicatorNoIntervalCreateSchema,
} from "./indicator-no-interval-create-schema";

export interface CalculableNoIntervalIndiceCreate {
  nombre: string;
  calculo: Calculos;
  indicadoresSinIntervalos: IndicatorNoIntervalCreate[];
}

export const calculableNoIntervalIndiceCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre de la configuración es requerido" }),
  calculo: z.enum([
    Calculos.Criticidad,
    Calculos.Detectabilidad,
    Calculos.Frecuencia,
    Calculos.Impacto,
  ]),
  indicadoresSinIntervalos: z.array(indicatorNoIntervalCreateSchema),
});
