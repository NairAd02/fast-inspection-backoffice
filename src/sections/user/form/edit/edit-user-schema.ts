import { z } from "zod";
import { Role } from "@/lib/types/user";

export type EditUserSchema = z.infer<typeof EditUserSchema>;
export const EditUserSchema = z.object({
  nombreUsuario: z.string().min(1, "El nombre de usuario es obligatorio"),
  contrasena: z
    .string()
    .min(8, "La contraseña debe tener almenos 8 caracteres")
    .optional(),
  email: z.string().email("El email debe ser válido"),
  rol: z.enum(Role),
});
