import { z } from "zod";

export interface sendVeriy {
  codigoActivacion: string;
}

export const sendVeriySchema = z.object({
  codigoActivacion: z
    .string()
    .min(1, { message: "El código es requerido" })
    .max(6, { message: "El código no puede exceder los 6 carácteres" }),
});
