"use server";

import { auth } from "@/auth";
import { IQueryable } from "../types/request";
import { QueryParamsURLFactory } from "../request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { PaginationResponse } from "../types/pagination";
import { buildApiResponse } from "../api";
import { CalculableNoIntervalIndice } from "../types/calculable-no-interval-indices";

export async function getCalculableNoIntervalIndicesList(params: IQueryable) {
  const session = await auth();

  const url = new QueryParamsURLFactory(
    params,
    apiRoutes.calculableNoIntervalIndices.get
  ).build();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    next: { tags: [tagsCacheByRoutes.calculableNoIntervalIndices.multipleTag] },
  });

  return await buildApiResponse<PaginationResponse<CalculableNoIntervalIndice>>(
    res
  );
}
