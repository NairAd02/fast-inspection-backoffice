"use server";

import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { QueryParamsURLFactory } from "../request";
import { IQueryable } from "../types/request";
import { buildApiResponse } from "../api";
import { PaginationResponse } from "../types/pagination";
import { Config, ConfigDetails } from "../types/configs";
import { auth } from "@/auth";

export async function getConfigsList(params: IQueryable) {
  const session = await auth();

  const url = new QueryParamsURLFactory(params, apiRoutes.configs.get).build();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    next: { tags: [tagsCacheByRoutes.configs.multipleTag] },
  });

  return await buildApiResponse<PaginationResponse<Config>>(res);
}

export async function getConfigById(id: string) {
  const res = await fetch(apiRoutes.configs.getById.replace(":id", id), {
    method: "GET",
    next: { tags: [tagsCacheByRoutes.configs.singleTag] },
  });

  return await buildApiResponse<ConfigDetails>(res);
}
