import { z } from "zod";

export interface IndicatorNoIntervalCreate {
  nombre: string;
  valor: number;
}

export const indicatorNoIntervalCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre de la configuración es requerido" }),
  valor: z
    .number()
    .min(1, { message: "El valor debe de ser un número positivo" }),
});
