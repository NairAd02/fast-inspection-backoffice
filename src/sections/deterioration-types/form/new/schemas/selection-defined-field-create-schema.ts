import { DefinedFieldTypes } from "@/lib/types/defined-fields";
import { z } from "zod";

export interface SelectionDefinedFieldCreate {
  nombre: string;
  tipo: DefinedFieldTypes;
  opciones: string[];
}

export const selectionDefinedFieldCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre del campo definido es requerido" }),
  tipo: z.enum([
    DefinedFieldTypes.IMAGE,
    DefinedFieldTypes.NUMERIC,
    DefinedFieldTypes.SELECTION,
    DefinedFieldTypes.TEXT,
  ]),
  opciones: z
    .array(z.string())
    .min(1, { message: "Se debe de seleccionar al menos una opción" }),
});
