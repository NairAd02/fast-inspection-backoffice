import { ChangePasswordForgot } from "@/sections/auth/form/change-password-forgot/schemas/change-password-forgot-schema";
import { VerifyCode } from "@/sections/auth/form/verify-code/shcemas/verify-code-schema";

export interface CredentialsDTO {
  nombreUsuario: string;
  contrasena: string;
}

export interface VerifyCodeDTO {
  idUsuario: string;
  codigoActivacion: string;
}

export interface ChangepasswordForgotDTO {
  contrasena: string;
}

export const convertVerifyCodeDTO = (
  verifyCode: VerifyCode,
  userId: string
): VerifyCodeDTO => {
  return {
    ...verifyCode,
    idUsuario: userId,
  };
};

export const convertChangePasswordForgotDTO = (
  changePasswordForgot: ChangePasswordForgot
): ChangepasswordForgotDTO => {
  return {
    contrasena: changePasswordForgot.password,
  };
};
