import { DefinedFieldTypes } from "@/lib/types/defined-fields";
import { z } from "zod";

export interface TextDefinedFieldCreate {
  nombre: string;
  tipo: DefinedFieldTypes;
}

export const textDefinedFieldCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre del campo definido es requerido" }),
  tipo: z.enum([
    DefinedFieldTypes.IMAGE,
    DefinedFieldTypes.NUMERIC,
    DefinedFieldTypes.SELECTION,
    DefinedFieldTypes.TEXT,
  ]),
});
