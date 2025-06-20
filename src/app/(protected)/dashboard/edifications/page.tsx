import React from "react";
import EdificationsContainer from "@/sections/edifications/edifications-container";
import { SearchParamsPagination } from "@/lib/types/pagination";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function EdificationsPage({ searchParams }: Props) {
  return <EdificationsContainer searchParams={await searchParams} />;
}
