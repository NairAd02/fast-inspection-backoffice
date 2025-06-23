import { z } from "zod";
import { Role } from "@/lib/types/user";

export type EditUserSchema = z.infer<typeof EditUserSchema>;
export const EditUserSchema = z.object({
  nombreUsuario: z.string().min(1, "El nombre de usuario es obligatorio"),
  contrasena: z
    .string()
    .refine((val) => val.length === 0 || val.length >= 8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
  email: z.string().email("El email debe ser válido"),
  rol: z.enum(Role),
});
