import { Role } from "@/lib/types/user";
import { z } from "zod";

export type NewUserSchema = z.infer<typeof NewUserSchema>
export const NewUserSchema = z.object({
    "nombreUsuario": z.string().min(1, "El nombre de usuario es obligatorio"),
    "contrasena": z.string().min(8, "La contraseña debe tener almenos 8 caracteres"),
    "email": z.string().email("El email debe ser válido"),
    "rol": z.enum(Role)
})