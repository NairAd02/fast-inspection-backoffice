"use server";

import { auth } from "@/auth";
import {
  DeteriorationType,
  DeteriorationTypeCreateDTO,
  DeteriorationTypeDetails,
  DeteriorationTypeEditDTO,
} from "../types/deterioration-type";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { buildApiResponse } from "../api";

export async function createDeteriorationType(
  deteriorationTypeCreateDTO: DeteriorationTypeCreateDTO
) {
  console.log(deteriorationTypeCreateDTO);
  const session = await auth();
  const res = await fetch(apiRoutes.deteriorationTypes.create, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(deteriorationTypeCreateDTO),
  });

  return await buildApiResponse<DeteriorationType>(res);
}

export async function editDeteriorationType(
  id: string,
  deteriorationTypeEditDTO: DeteriorationTypeEditDTO
) {
  const session = await auth();
  const res = await fetch(
    apiRoutes.deteriorationTypes.edit.replace(":id", id),
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + session?.accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify(deteriorationTypeEditDTO),
    }
  );

  return await buildApiResponse<DeteriorationType>(res);
}

export async function getDeteriorationTypeById(id: string) {
  const session = await auth();
  const res = await fetch(
    apiRoutes.deteriorationTypes.getById.replace(":id", id),
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
      next: {
        tags: [tagsCacheByRoutes.deteriorationTypes.singleTag + ": " + id],
      },
    }
  );

  return await buildApiResponse<DeteriorationTypeDetails>(res);
}
