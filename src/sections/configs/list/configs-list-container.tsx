import React from "react";
import { getConfigsList } from "@/lib/services/configs";
import ConfigsList from "./configs-list";
import ConfigsFiltersContainer from "../filters/configs-filters-container";
import { SearchParamsPagination } from "@/lib/types/pagination";

/* const configs: Config[] = [
  {
    version: 1,
    nombre: "Configuración 1",
    descripcion: "Descripción de la configuración 1",
    state: true,
    porcentajeCompletitud: 0.75,
  },
  {
    version: 2,
    nombre: "Configuración 2",
    descripcion: "Descripción de la configuración 2",
    state: false,
    porcentajeCompletitud: 0.5,
  },
  {
    version: 3,
    nombre: "Configuración 3",
    descripcion: "Descripción de la configuración 3",
    state: true,
    porcentajeCompletitud: 0.9,
  },
  {
    version: 4,
    nombre: "Configuración 4",
    descripcion: "Descripción de la configuración 4",
    state: false,
    porcentajeCompletitud: 0.3,
  },
];*/

interface Props {
  searchParams: SearchParamsPagination
}


export default async function ConfigsListContainer({searchParams}: Props) {
  const res = await getConfigsList(searchParams);

  if (!res.response || res.error) throw new Error("Error fetching configs");
  const configs = res.response.data;
  return <div className="flex flex-col justify-center gap-6">
    <ConfigsFiltersContainer />
    <ConfigsList configs={configs} />
  </div>;
}
