export interface CredentialsDTO {
  nombreUsuario: string;
  contrasena: string;
}

export interface VerifyCodeDTO {
  idUsuario: string;
  codigoActivacion: string;
}
