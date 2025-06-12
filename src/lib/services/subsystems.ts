"use server";

import { auth } from "@/auth";
import { Subsystem, SubsystemCreateDTO } from "../types/subsystems";
import { apiRoutes } from "@/routes/api-routes/api-routes";
import { buildApiResponse } from "../api";

export async function createSubsystem(subsystemCreateDTO: SubsystemCreateDTO) {
  const session = await auth();
  const res = await fetch(apiRoutes.subsystem.create, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(subsystemCreateDTO),
  });

  return await buildApiResponse<Subsystem>(res);
}
