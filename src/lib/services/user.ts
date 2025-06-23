"use server";

import { auth } from "@/auth";
import { IQueryable } from "../types/request";
import { QueryParamsURLFactory } from "../request";
import { apiRoutes, tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { buildApiResponse } from "../api";
import { PaginationResponse } from "../types/pagination";
import {
  ChangePasswordUserDTO,
  User,
  UserDetails,
  UserEditDTO,
} from "../types/user";
import { NewUserSchema } from "@/sections/user/form/new/new-user-schema";

export async function getUserList(params: IQueryable) {
  const session = await auth();
  console.log(session);

  const url = new QueryParamsURLFactory(
    params,
    apiRoutes.user.get.replace(":id", session?.user?.id || "")
  ).build();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    next: { tags: [tagsCacheByRoutes.users.multipleTag] },
  });

  return await buildApiResponse<PaginationResponse<User>>(res);
}

export async function getUserById(id: string) {
  const session = await auth();
  const res = await fetch(apiRoutes.user.getById.replace(":id", id), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
    },
    next: { tags: [tagsCacheByRoutes.users.singleTag + ": " + id] },
  });

  return await buildApiResponse<UserDetails>(res);
}

export async function createUser(userCreateDTO: NewUserSchema) {
  const session = await auth();
  const res = await fetch(apiRoutes.user.create, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(userCreateDTO),
  });

  return await buildApiResponse<User>(res);
}

export async function editUser(id: string, userEditDTO: UserEditDTO) {
  const session = await auth();
  const res = await fetch(apiRoutes.user.edit.replace(":id", id), {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(userEditDTO),
  });

  return await buildApiResponse<User>(res);
}

export async function changePasswordUser(
  changePasswordUserDTO: ChangePasswordUserDTO
) {
  const session = await auth();
  const res = await fetch(apiRoutes.user.changePassword, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session?.accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify(changePasswordUserDTO),
  });

  return await buildApiResponse<User>(res);
}
