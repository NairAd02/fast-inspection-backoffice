"use server";

import { auth } from "@/auth";
import {
  DeteriorationType,
  DeteriorationTypeCreateDTO,
} from "../types/deterioration-type";
import { apiRoutes } from "@/routes/api-routes/api-routes";
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
