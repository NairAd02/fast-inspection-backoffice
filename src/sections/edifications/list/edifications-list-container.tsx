import { getEdificationsList } from "@/lib/services/edifications";
import { SearchParamsPagination } from "@/lib/types/pagination";
import React from "react";
import EdificationsList from "./edifications-list";

interface Props {
  searchParams: SearchParamsPagination;
}

export default async function EdificationsListContainer({
  searchParams,
}: Props) {
  const res = await getEdificationsList(searchParams);

  if (!res.response || res.error)
    throw new Error("Error fetching edifications");
  const edifications = res.response.data;

  return <EdificationsList edifications={edifications} />;
}
