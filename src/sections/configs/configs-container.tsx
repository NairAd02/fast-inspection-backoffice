import SectionsHeader from "@/components/sections-header/sections-header";
import { FileCogIcon } from "lucide-react";
import React from "react";
import { modalTypes } from "@/components/modal/types/modalTypes";
import ConfigsListContainer from "./list/configs-list-container";

export default function ConfigsContainer() {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<FileCogIcon />}
        sectionTitle="Gestión de Configuraciones"
        sectionDescription="Gestione la configuraciones usadas para la inspección de deterioros"
        addButton={{
          isModalRedirect: true,
          buttonText: "Nueva Configuración",
          creationPath: modalTypes.newConfigModal.name,
        }}
      />
      <ConfigsListContainer  />
    </div>
  );
}
