"use server";

import { signIn as signInAuth } from "@/auth";
import { buildApiResponse } from "@/lib/api";
import { apiRoutes } from "@/routes/api-routes/api-routes";
import { Session } from "next-auth";
import {
  ChangepasswordForgotDTO,
  CredentialsDTO,
  VerifyCodeDTO,
} from "../types/auth";

export async function login(credentials: CredentialsDTO) {
  const res = await fetch(apiRoutes.auth.login, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return buildApiResponse<Session>(res);
}

export async function signIn(credentials: CredentialsDTO) {
  return signInAuth("credentials", {
    username: credentials.nombreUsuario,
    password: credentials.contrasena,
    redirect: false,
  });
}

export async function sendVerificationCode(userId: string) {
  const res = await fetch(
    apiRoutes.auth.sendVerificationCode.replace(":idUsuario", userId),
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  return await buildApiResponse<{ success: boolean }>(res);
}

export async function verifyCode(verifyCodeDTO: VerifyCodeDTO) {
  const res = await fetch(apiRoutes.auth.verifyCode, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(verifyCodeDTO),
  });

  return await buildApiResponse<{ success: boolean }>(res);
}

export async function changePasswordForgot(
  userId: string,
  changePassowrdForgotDTO: ChangepasswordForgotDTO
) {
  const res = await fetch(apiRoutes.user.edit.replace(":id", userId), {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(changePassowrdForgotDTO),
  });

  return await buildApiResponse<{ success: boolean }>(res);
}
