import { DefinedFieldTypes } from "@/lib/types/defined-fields";
import { z } from "zod";

export interface SelectionDefinedFieldEdit {
  nombre: string;
  tipo: DefinedFieldTypes;
  opciones: { nombre: string }[];
}

export const selectionDefinedFieldEditSchema = z.object({
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
    .array(
      z.object({
        nombre: z
          .string()
          .min(1, { message: "El nombre de la opción es requerido" }),
      })
    )
    .min(1, { message: "Se debe de seleccionar al menos una opción" }),
});
