import { z } from "zod";

export interface MaterialCreate {
  nombre: string;
}

export const materialCreateSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre del material es requerido" }),
});
