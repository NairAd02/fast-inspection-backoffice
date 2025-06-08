import React from "react";
import ConfigCard from "../components/config-card/config-card";
import EmptyContent from "@/components/empty-content/empty-content";
import { getConfigsList } from "@/lib/services/configs";

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

export default async function ConfigsList() {
  const res = await getConfigsList({});

  if (!res.response || res.error) throw new Error("Error fetching configs");
  const configs = res.response.data;
  return configs.length > 0 ? (
    <div className=" w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {configs.map((config, index) => (
        <ConfigCard key={index} config={config} />
      ))}
    </div>
  ) : (
    <EmptyContent
      title="No hay configuraciones registradas"
      description="Todavía no se han registrado configuraciones en el sistema."
    />
  );
}
