"use server";

import { signIn as signInAuth } from "@/auth";
import { buildApiResponse } from "@/lib/api";
import { apiRoutes } from "@/routes/api-routes/api-routes";
import { Session } from "next-auth";
import { CredentialsDTO } from "../types/auth";

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
