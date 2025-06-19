import React from "react";
import CustomMapWrapper from '@/components/CustomMap/CustomMapWrapper';
import { Edificacion } from '@/lib/types/Edificacion';

import SectionsHeader from "@/components/sections-header/sections-header";
import {FileCogIcon} from "lucide-react";

async function getEdificaciones(): Promise<Edificacion[]> {
    const res = await fetch('http://31.97.43.136:3000/edifications-controller/findAllEdificaciones', {
        cache: 'no-store',
    });
    const json = await res.json();
    return json.data;
}

export default async function EdificationsPage() {
  const edificaciones = await getEdificaciones();

  const points = edificaciones.map((e) => ({
        lat: e.coordX,
        lng: e.coordY,
        // info: `<strong>${e.nombre}</strong><br/>${e.direccion}`,
        info: `${e.nombre} ${e.direccion}`,
        edificacion: e,
  }));

  return (
      <div className="flex flex-col gap-4">
        <SectionsHeader
            sectionIcon={<FileCogIcon />}
            sectionTitle="Gestión de Edificaciones"
            sectionDescription="Gestione la edificaciones usadas para la inspección de deterioros"
            // addButton={{
            //   isModalRedirect: true,
            //   buttonText: "Nueva Configuración",
            //   creationPath: modalTypes.newConfigModal.name,
            // }}
        />
        <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Mapa de Edificaciones</h1>
            <CustomMapWrapper points={points} />
        </div>
      </div>
  );
}
