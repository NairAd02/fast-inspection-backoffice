import { z } from "zod";

export interface MaterialEdit {
  nombre: string;
}

export const materialEditSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre del material es requerido" }),
});
