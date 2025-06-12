"use server";

import { auth } from "@/auth";
import {
  Subsystem,
  SubsystemCreateDTO,
  SubsystemEditDTO,
} from "../types/subsystems";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { buildApiResponse } from "../api";

export async function getSubsystemById(id: string) {
  const session = await auth();
  const res = await fetch(apiRoutes.subsystems.getById.replace(":id", id), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    next: { tags: [tagsCacheByRoutes.subsystems.singleTag + ": " + id] },
  });

  return await buildApiResponse<Subsystem>(res);
}

export async function createSubsystem(subsystemCreateDTO: SubsystemCreateDTO) {
  const session = await auth();
  const res = await fetch(apiRoutes.subsystems.create, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(subsystemCreateDTO),
  });

  return await buildApiResponse<Subsystem>(res);
}

export async function editSubsystem(
  id: string,
  subsystemEditDTO: SubsystemEditDTO
) {
  const session = await auth();
  const res = await fetch(apiRoutes.subsystems.edit.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(subsystemEditDTO),
  });

  return await buildApiResponse<Subsystem>(res);
}

export async function deleteSubsystem(id: string) {
  const session = await auth();
  const res = await fetch(apiRoutes.subsystems.delete.replace(":id", id), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
  });

  return await buildApiResponse<Subsystem>(res);
}
