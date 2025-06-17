"use server";

import { auth } from "@/auth";
import { IQueryable } from "../types/request";
import { QueryParamsURLFactory } from "../request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { PaginationResponse } from "../types/pagination";
import { buildApiResponse } from "../api";
import { CalculableIntervalIndice } from "../types/calculable-interval-indices";

export async function getCalculableIntervalIndicesList(params: IQueryable) {
  const session = await auth();

  const url = new QueryParamsURLFactory(
    params,
    apiRoutes.calculableIntervalIndices.get
  ).build();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    next: { tags: [tagsCacheByRoutes.calculableIntervalIndices.multipleTag] },
  });

  return await buildApiResponse<PaginationResponse<CalculableIntervalIndice>>(
    res
  );
}
