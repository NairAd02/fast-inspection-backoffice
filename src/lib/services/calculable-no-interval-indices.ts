"use server";

import { auth } from "@/auth";
import { IQueryable } from "../types/request";
import { QueryParamsURLFactory } from "../request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { PaginationResponse } from "../types/pagination";
import { buildApiResponse } from "../api";
import {
  CalculableNoIntervalIndice,
  CalculableNoIntervalIndiceCreateDTO,
  CalculableNoIntervalIndiceDetails,
  CalculableNoIntervalIndiceEditDTO,
} from "../types/calculable-no-interval-indices";

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

export async function getCalculableNoIntervalIndiceById(id: string) {
  const session = await auth();
  const res = await fetch(
    apiRoutes.calculableNoIntervalIndices.getById.replace(":id", id),
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
      next: {
        tags: [
          tagsCacheByRoutes.calculableNoIntervalIndices.singleTag + ": " + id,
        ],
      },
    }
  );

  return await buildApiResponse<CalculableNoIntervalIndiceDetails>(res);
}

export async function createCalculableNoIntervalIndice(
  calculableNoIntervalIndiceCreateDTO: CalculableNoIntervalIndiceCreateDTO
) {
  const session = await auth();
  const res = await fetch(apiRoutes.calculableNoIntervalIndices.create, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(calculableNoIntervalIndiceCreateDTO),
  });

  return await buildApiResponse<CalculableNoIntervalIndice>(res);
}

export async function editCalculableNoIntervalIndice(
  id: string,
  calculableNoIntervalIndiceEditDTO: CalculableNoIntervalIndiceEditDTO
) {
  const session = await auth();
  const res = await fetch(
    apiRoutes.calculableNoIntervalIndices.edit.replace(":id", id),
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + session?.accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify(calculableNoIntervalIndiceEditDTO),
    }
  );

  return await buildApiResponse<CalculableNoIntervalIndice>(res);
}
