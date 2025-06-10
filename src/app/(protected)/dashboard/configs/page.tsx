import { SearchParamsPagination } from "@/lib/types/pagination";
import ConfigsContainer from "@/sections/configs/configs-container";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function ConfigsPage({ searchParams }: Props) {
  return (
    <>
      <ConfigsContainer searchParams={await searchParams} />
    </>
  );
}
