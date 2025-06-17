"use server";

import { auth } from "@/auth";
import { IQueryable } from "../types/request";
import { QueryParamsURLFactory } from "../request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { buildApiResponse } from "../api";
import { PaginationResponse } from "../types/pagination";
import { Tool, ToolCreateDTO, ToolDetails } from "../types/tools";
import { ToolEdit } from "@/sections/tools/form/edit/schemas/tool-edit-schema";

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

export async function getToolById(id: string) {
  const session = await auth();
  const res = await fetch(apiRoutes.tools.getById.replace(":id", id), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    next: { tags: [tagsCacheByRoutes.systems.singleTag + ": " + id] },
  });

  return await buildApiResponse<ToolDetails>(res);
}

export async function createTool(toolCreateDTO: ToolCreateDTO) {
  const session = await auth();
  const res = await fetch(apiRoutes.tools.create, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(toolCreateDTO),
  });

  return await buildApiResponse<Tool>(res);
}

export async function editTool(id: string, toolEditDTO: ToolEdit) {
  const session = await auth();
  const res = await fetch(apiRoutes.tools.edit.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(toolEditDTO),
  });

  return await buildApiResponse<Tool>(res);
}

export async function deleteTool(id: string) {
  const session = await auth();
  const res = await fetch(apiRoutes.tools.delete.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
  });

  return await buildApiResponse<Tool>(res);
}
