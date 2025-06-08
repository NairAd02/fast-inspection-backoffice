import { z } from "zod";

export interface ConfigCreate {
  nombre: string;
  descripcion: string;
}

export const configCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre de la configuración es requerido" }),
  descripcion: z
    .string()
    .min(1, { message: "La descripción de la configuración es requerida" }),
});
