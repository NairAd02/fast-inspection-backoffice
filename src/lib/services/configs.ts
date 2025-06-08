"use server";

import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { QueryParamsURLFactory } from "../request";
import { IQueryable } from "../types/request";
import { buildApiResponse } from "../api";
import { PaginationResponse } from "../types/pagination";
import {
  Config,
  ConfigCreateDTO,
  ConfigDetails,
  ConfigEditDTO,
} from "../types/configs";
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

export async function getConfigById(version: string) {
  const session = await auth();
  const res = await fetch(
    apiRoutes.configs.getById.replace(":versionConfig", version),
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
      next: { tags: [tagsCacheByRoutes.configs.singleTag] },
    }
  );

  return await buildApiResponse<ConfigDetails>(res);
}

export async function createConfig(configCreateDTO: ConfigCreateDTO) {
  const session = await auth();
  const res = await fetch(apiRoutes.configs.createNewConfig, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(configCreateDTO),
  });

  return await buildApiResponse<Config>(res);
}

export async function editConfig(
  version: string,
  configEditDTO: ConfigEditDTO
) {
  const session = await auth();
  const res = await fetch(
    apiRoutes.configs.editConfig.replace(":version", version),
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + session?.accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify(configEditDTO),
    }
  );

  return await buildApiResponse<Config>(res);
}

export async function markConfigAsActive(version: string) {
  const session = await auth();
  const res = await fetch(
    apiRoutes.configs.markConfigAsActive.replace(":version", version),
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + session?.accessToken,
        "content-type": "application/json",
      },
    }
  );

  return await buildApiResponse<Config>(res);
}

export async function createConfigByOtherConfig(
  version: string,
  configCreateDTO: ConfigCreateDTO
) {
  const session = await auth();
  const res = await fetch(
    apiRoutes.configs.createConfigByOtherConfig.replace(
      ":versionOtherConfig",
      version
    ),
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session?.accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify(configCreateDTO),
    }
  );

  return await buildApiResponse<Config>(res);
}

export async function deleteConfig(version: string) {
  const session = await auth();
  const res = await fetch(
    apiRoutes.configs.deleteConfig.replace(":version", version),
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + session?.accessToken,
        "content-type": "application/json",
      },
    }
  );

  return await buildApiResponse<Config>(res);
}
