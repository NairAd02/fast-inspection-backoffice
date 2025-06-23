import { EditUserSchema } from "@/sections/user/form/edit/edit-user-schema";
import { ChangePassword } from "@/sections/user/form/profile/components/change-password-mode-form/schemas/change-password-schema";

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

export interface ChangePasswordUserDTO {
  idUsuario: string;
  newContrasena: string;
  contrasenaAnterior: string;
}

export const convertChangePasswordUserDTO = (
  changePassword: ChangePassword,
  userId: string
): ChangePasswordUserDTO => {
  return {
    newContrasena: changePassword.newPassword,
    contrasenaAnterior: changePassword.oldPassword,
    idUsuario: userId,
  };
};

export const convertUserEditDTO = (user: EditUserSchema): UserEditDTO => {
  return {
    ...user,
    contrasena: user.contrasena || undefined,
  };
};
