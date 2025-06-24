import { VerifyCode } from "@/sections/auth/form/verify-code/shcemas/verify-code-schema";

export interface CredentialsDTO {
  nombreUsuario: string;
  contrasena: string;
}

export interface VerifyCodeDTO {
  idUsuario: string;
  codigoActivacion: string;
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
