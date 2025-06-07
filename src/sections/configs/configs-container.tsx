import SectionsHeader from "@/components/sections-header/sections-header";
import { FileCogIcon } from "lucide-react";
import React from "react";
import ConfigsList from "./list/configs-list";

export default function ConfigsContainer() {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<FileCogIcon />}
        sectionTitle="Gestión de Configuraciones"
        sectionDescription="Gestione la configuraciones usadas para la inspección de deterioros"
      />
      <ConfigsList />
    </div>
  );
}
