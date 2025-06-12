"use server";

import { auth } from "@/auth";
import { IQueryable } from "../types/request";
import { QueryParamsURLFactory } from "../request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { buildApiResponse } from "../api";
import { PaginationResponse } from "../types/pagination";
import { Tool } from "../types/tools";

export async function getToolsList(params: IQueryable) {
  const session = await auth();

  const url = new QueryParamsURLFactory(params, apiRoutes.tools.get).build();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    next: { tags: [tagsCacheByRoutes.configs.multipleTag] },
  });

  return await buildApiResponse<PaginationResponse<Tool>>(res);
}
