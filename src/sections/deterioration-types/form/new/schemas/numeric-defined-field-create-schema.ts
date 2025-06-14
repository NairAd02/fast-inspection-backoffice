import { DefinedFieldTypes } from "@/lib/types/defined-fields";
import { z } from "zod";

export interface NumericDefinedFieldCreate {
  nombre: string;
  tipo: DefinedFieldTypes;
  inicioIntervalo: number;
  finalIntervalo: number;
  unidadMedida: string;
}

export const numericDefinedFieldCreateSchema = z
  .object({
    nombre: z
      .string()
      .min(1, { message: "El nombre del campo definido es requerido" }),
    tipo: z.enum([
      DefinedFieldTypes.IMAGE,
      DefinedFieldTypes.NUMERIC,
      DefinedFieldTypes.SELECTION,
      DefinedFieldTypes.TEXT,
    ]),
    inicioIntervalo: z.number(),
    finalIntervalo: z.number(),
    unidadMedida: z.string().min(1, {
      message: "La unidad de medida del campo definido es requerida",
    }),
  })
  .refine((data) => data.inicioIntervalo <= data.finalIntervalo, {
    message: "El inicio del intervalo no puede ser mayor que el final",
    path: ["inicioIntervalo"],
  });
