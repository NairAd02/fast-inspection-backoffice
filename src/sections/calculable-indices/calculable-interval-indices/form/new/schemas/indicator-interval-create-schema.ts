import { z } from "zod";

export interface IndicatorIntervalCreate {
  nombre: string;
  valor: number;
  limiteInferior: number;
  limiteSuperior?: number;
}

export const indicatorIntervalCreateSchema = z
  .object({
    nombre: z
      .string()
      .min(1, { message: "El nombre de la configuración es requerido" }),
    valor: z.number().min(1, { message: "El valor es requerido" }),
    limiteInferior: z
      .number()
      .min(1, { message: "El límite inferior es requerido" }),
    limiteSuperior: z
      .number()
      .min(1, { message: "El límite superior debe ser mayor a 0" })
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.limiteSuperior) return true;

      return data.limiteSuperior > data.limiteInferior;
    },
    {
      message: "El límite superior debe ser mayor que el límite inferior",
      path: ["limiteSuperior"],
    }
  );
