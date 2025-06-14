import { z } from "zod";
import {
  NumericDefinedFieldCreate,
  numericDefinedFieldCreateSchema,
} from "./numeric-defined-field-create-schema";
import {
  SelectionDefinedFieldCreate,
  selectionDefinedFieldCreateSchema,
} from "./selection-defined-field-create-schema";
import {
  TextDefinedFieldCreate,
  textDefinedFieldCreateSchema,
} from "./text-defined-field-create-schema";
import {
  ImageDefinedFieldCreate,
  imageDefinedFieldCreateSchema,
} from "./image-defined-field-schema";

export interface DeteriorationTypeCreate {
  nombre: string;
  detectabilidad: number;
  camposAfectados: string[];
  causas: { nombre: string }[];
  camposDefinidosNumericos: NumericDefinedFieldCreate[];
  camposDefinidosSeleccion: SelectionDefinedFieldCreate[];
  camposDefinidosTexto: TextDefinedFieldCreate[];
  camposDefinidosImagen: ImageDefinedFieldCreate[];
}

export const deteriorationTypeCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre del tipo de deterioro es requerido" }),
  detectabilidad: z
    .number()
    .min(1, { message: "La detectabilidad tiene que ser un valor en el rango" })
    .max(3, {
      message: "La detectabilidad tiene que ser un valor en el rango",
    }),
  camposAfectados: z
    .array(z.string())
    .min(1, { message: "Se debe seleccionar al menos un campo afectado" }),
  causas: z.array(
    z.object({
      nombre: z
        .string()
        .min(1, { message: "El nombre de la causa es requerido" }),
    })
  ),
  camposDefinidosNumericos: z.array(numericDefinedFieldCreateSchema),
  camposDefinidosSeleccion: z.array(selectionDefinedFieldCreateSchema),
  camposDefinidosTexto: z.array(textDefinedFieldCreateSchema),
  camposDefinidosImagen: z.array(imageDefinedFieldCreateSchema),
});
