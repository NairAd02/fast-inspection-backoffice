"use server";

import { auth } from "@/auth";
import { IQueryable } from "../types/request";
import { QueryParamsURLFactory } from "../request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { buildApiResponse } from "../api";
import { PaginationResponse } from "../types/pagination";
import { Inspection } from "../types/inspections";

export async function getInspectionsList(params: IQueryable) {
  const session = await auth();

  const url = new QueryParamsURLFactory(
    params,
    apiRoutes.inspections.get
  ).build();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    next: { tags: [tagsCacheByRoutes.inspections.multipleTag] },
  });

  return await buildApiResponse<PaginationResponse<Inspection>>(res);
}
