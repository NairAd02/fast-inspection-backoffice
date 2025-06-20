"use client";
import CustomMapWrapper, {
  CustomMapWrapperRef,
} from "@/components/CustomMap/CustomMapWrapper";
import { Edification } from "@/lib/types/edifications";
import React, { useRef } from "react";
import EdificationTable from "./edifications-table";

interface Props {
  edifications: Edification[];
}

export default function EdificationsList({ edifications }: Props) {
  const customMapWrapperRef = useRef<CustomMapWrapperRef>(null);
  return (
    <div className="p-6 mb-6 bg-white flex flex-col gap-2 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Mapa de Edificaciones
      </h1>
      <CustomMapWrapper
        ref={customMapWrapperRef}
        points={edifications.map((e) => ({
          lat: e.coordX,
          lng: e.coordY,
          info: `${e.nombre} ${e.direccion}`,
          edificacion: e,
        }))}
      />
      <EdificationTable
        edifications={edifications}
        centeredMap={(id: number) => {
          if (customMapWrapperRef.current) {
            customMapWrapperRef.current.centrarEnEdificio(id);
          }
        }}
      />
    </div>
  );
}
