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
  EdificationEditDTO,
} from "../types/edifications";
import { EditUserSchema } from "@/sections/user/form/edit/edit-user-schema";

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

export async function editEdification(
  id: string,
  edificationEditDTO: EditUserSchema
) {
  const session = await auth();
  const res = await fetch(apiRoutes.edifications.edit.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(edificationEditDTO),
  });

  return await buildApiResponse<Edification>(res);
}

export async function deleteEdification(id: string) {
  const session = await auth();
  const res = await fetch(apiRoutes.edifications.delete.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
  });

  return await buildApiResponse<Edification>(res);
}
