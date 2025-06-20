import CustomMapWrapper from "@/components/CustomMap/CustomMapWrapper";
import { Edification } from "@/lib/types/edifications";
import React from "react";

interface Props {
  edifications: Edification[];
}

export default function EdificationsList({ edifications }: Props) {
  return (
    <div className="p-6 mb-6 bg-white flex flex-col gap-2 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Mapa de Edificaciones
      </h1>
      <CustomMapWrapper
        points={edifications.map((e) => ({
          lat: e.coordX,
          lng: e.coordY,
          info: `${e.nombre} ${e.direccion}`,
          edificacion: e,
        }))}
      />
    </div>
  );
}
