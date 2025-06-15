import { z } from "zod";
import {
  NumericDefinedFieldEdit,
  numericDefinedFieldEditSchema,
} from "./numeric-defined-field-edit-schema";

import {
  ImageDefinedFieldEdit,
  imageDefinedFieldEditSchema,
} from "./image-defined-field-edit-schema";
import {
  SelectionDefinedFieldEdit,
  selectionDefinedFieldEditSchema,
} from "./selection-defined-field-edit-schema";
import {
  TextDefinedFieldEdit,
  textDefinedFieldEditSchema,
} from "./text-defined-field-eidt-schema";

export interface DeteriorationTypeEdit {
  nombre: string;
  detectabilidad: number;
  camposAfectados: string[];
  causas: { nombre: string }[];
  camposDefinidosNumericos: NumericDefinedFieldEdit[];
  camposDefinidosSeleccion: SelectionDefinedFieldEdit[];
  camposDefinidosTexto: TextDefinedFieldEdit[];
  camposDefinidosImagen: ImageDefinedFieldEdit[];
}

export const deteriorationTypeEditSchema = z.object({
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
  camposDefinidosNumericos: z.array(numericDefinedFieldEditSchema),
  camposDefinidosSeleccion: z.array(selectionDefinedFieldEditSchema),
  camposDefinidosTexto: z.array(textDefinedFieldEditSchema),
  camposDefinidosImagen: z.array(imageDefinedFieldEditSchema),
});
