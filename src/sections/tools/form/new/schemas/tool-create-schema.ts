import { z } from "zod";
import { FieldCreate, fieldCreateSchema } from "./field-create-schema";

export interface ToolCreate {
  nombre: string;
  campos: FieldCreate[];
}

export const toolCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre de la herramienta es requerido" }),
  campos: z
    .array(fieldCreateSchema)
    .min(1, { message: "Se debe de seleccionar al menos un campo" }),
});
