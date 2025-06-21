"use server";

import { auth } from "@/auth";
import { IQueryable } from "../types/request";
import { QueryParamsURLFactory } from "../request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { buildApiResponse } from "../api";
import { PaginationResponse } from "../types/pagination";
import {
  Edification,
  EdificationCreateDTO,
  EdificationDetails,
} from "../types/edifications";

export async function getEdificationsList(params: IQueryable) {
  const session = await auth();

  const url = new QueryParamsURLFactory(
    params,
    apiRoutes.edifications.get
  ).build();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    next: { tags: [tagsCacheByRoutes.edifications.multipleTag] },
  });

  return await buildApiResponse<PaginationResponse<Edification>>(res);
}

export async function getEdificationById(id: string) {
  const session = await auth();
  const res = await fetch(apiRoutes.edifications.getById.replace(":id", id), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    next: { tags: [tagsCacheByRoutes.edifications.singleTag + ": " + id] },
  });

  return await buildApiResponse<EdificationDetails>(res);
}

export async function createEdification(
  edificationCreateDTO: EdificationCreateDTO
) {
  const session = await auth();
  const res = await fetch(apiRoutes.edifications.create, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(edificationCreateDTO),
  });

  return await buildApiResponse<Edification>(res);
}
