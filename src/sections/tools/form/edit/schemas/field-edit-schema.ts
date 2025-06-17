import { z } from "zod";

export interface FieldEdit {
  nombre: string;
  nivelImportancia: number;
}

export const fieldEditSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre del campo es requerido" }),
  nivelImportancia: z
    .number()
    .min(1, {
      message:
        "El nivel de importancia del campo debe de ser un número en el rango",
    })
    .max(3, {
      message:
        "El nivel de importancia del campo debe de ser un número en el rango",
    }),
});
