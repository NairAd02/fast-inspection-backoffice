"use server";

import { auth } from "@/auth";
import {
  Material,
  MaterialCreateDTO,
  MaterialEditDTO,
} from "../types/materials";
import { apiRoutes } from "@/routes/api-routes/api-routes";
import { buildApiResponse } from "../api";

export async function createMaterial(materialCreateDTO: MaterialCreateDTO) {
  const session = await auth();
  const res = await fetch(apiRoutes.materials.create, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(materialCreateDTO),
  });

  return await buildApiResponse<Material>(res);
}

export async function editMaterial(
  id: string,
  materialEditDTO: MaterialEditDTO
) {
  const session = await auth();
  const res = await fetch(apiRoutes.materials.edit.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(materialEditDTO),
  });

  return await buildApiResponse<Material>(res);
}
