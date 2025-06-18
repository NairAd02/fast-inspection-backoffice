"use server";

import { auth } from "@/auth";
import { apiRoutes } from "@/routes/api-routes/api-routes";
import { buildApiResponse } from "../api";
import { CalculableIntervalIndice } from "../types/calculable-interval-indices";

export async function deleteCalculableIndice(id: string) {
  const session = await auth();
  const res = await fetch(
    apiRoutes.calculableIndices.delete.replace(":id", id),
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + session?.accessToken,
        "content-type": "application/json",
      },
    }
  );

  return await buildApiResponse<CalculableIntervalIndice>(res);
}
