import { z } from "zod";

export interface SubsystemEdit {
  nombre: string;
}

export const subsystemEditSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre del subsistema es requerido" }),
});
