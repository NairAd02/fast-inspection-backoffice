"use server";

import { auth } from "@/auth";
import { System, SystemCreateDTO, SystemEditDTO } from "../types/systems";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { buildApiResponse } from "../api";

export async function getSystemById(id: string) {
  const session = await auth();
  const res = await fetch(apiRoutes.systems.getById.replace(":id", id), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    next: { tags: [tagsCacheByRoutes.systems.singleTag + ": " + id] },
  });

  return await buildApiResponse<System>(res);
}

export async function createSystem(systemCreateDTO: SystemCreateDTO) {
  const session = await auth();
  const res = await fetch(apiRoutes.systems.create, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(systemCreateDTO),
  });

  return await buildApiResponse<System>(res);
}

export async function editSystem(id: string, systemEditDTO: SystemEditDTO) {
  const session = await auth();
  const res = await fetch(apiRoutes.systems.edit.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(systemEditDTO),
  });

  return await buildApiResponse<System>(res);
}
