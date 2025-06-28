import { SearchParamsPagination } from "@/lib/types/pagination";
import ConfigsContainer from "@/sections/configs/configs-container";
import { Metadata } from "next";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export const metadata: Metadata = {
  title: "Gestión de Configuraciones",
  description: "Administre las configuraciones que serán usadas en las inspecciones",
};

export default async function ConfigsPage({ searchParams }: Props) {
  return (
    <>
      <ConfigsContainer searchParams={await searchParams} />
    </>
  );
}
