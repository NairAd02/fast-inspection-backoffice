import { z } from "zod";

export interface SubsystemCreate {
  nombre: string;
}

export const subsystemCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre del subsistema es requerido" }),
});
