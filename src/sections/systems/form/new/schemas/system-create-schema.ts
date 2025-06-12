import { z } from "zod";

export interface SystemCreate {
  nombre: string;
  herramienta: string;
}

export const systemCreateSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre del sistema es requerido" }),
  herramienta: z
    .string()
    .min(1, { message: "Es necesario seleccionar una herramienta" }),
});
