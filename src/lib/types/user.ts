import { EditUserSchema } from "@/sections/user/form/edit/edit-user-schema";

export type Role = (typeof Role)[number];
export const Role = [
  "Súper Administrador",
  "Administrador",
  "Especialista Ing Civil",
  "Especialista Ing Civil Avanzado",
] as const;

export type User = {
  id: string;
  nombreUsuario: string;
  email: string;
  rol: string;
  isActiva: boolean;
};

export type UserDetails = {
  id: string;
  nombreUsuario: string;
  email: string;
  rol: string;
  isActiva: boolean;
};

export interface UserEditDTO {
  nombreUsuario: string;
  email: string;
  rol: string;
  contrasena?: string;
}

export const convertUserEditDTO = (user: EditUserSchema): UserEditDTO => {
  return {
    ...user,
    contrasena: user.contrasena || undefined,
  };
};
