import { z } from "zod";

export interface ConfigEdit {
  nombre: string;
  descripcion: string;
}

export const configEditSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre de la configuración es requerido" }),
  descripcion: z
    .string()
    .min(1, { message: "La descripción de la configuración es requerida" }),
});
