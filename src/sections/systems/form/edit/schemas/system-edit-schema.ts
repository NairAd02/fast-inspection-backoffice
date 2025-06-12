import { z } from "zod";

export interface SystemEdit {
  nombre: string;
}

export const systemEditSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre del sistema es requerido" }),
});
