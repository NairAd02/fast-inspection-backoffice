import { z } from "zod";
import { FieldEdit, fieldEditSchema } from "./field-edit-schema";

export interface ToolEdit {
  nombre: string;
  campos: FieldEdit[];
}

export const toolEditSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre de la herramienta es requerido" }),
  campos: z
    .array(fieldEditSchema)
    .min(1, { message: "Se debe de seleccionar al menos un campo" }),
});
