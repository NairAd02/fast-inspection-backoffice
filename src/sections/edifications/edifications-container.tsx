import SectionsHeader from "@/components/sections-header/sections-header";
import { FileCogIcon } from "lucide-react";
import React from "react";
import EdificationsListContainer from "./list/edifications-list-container";
import { SearchParamsPagination } from "@/lib/types/pagination";

interface Props {
  searchParams: SearchParamsPagination;
}

export default function EdificationsContainer({ searchParams }: Props) {
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
      <EdificationsListContainer searchParams={searchParams} />
    </div>
  );
}
