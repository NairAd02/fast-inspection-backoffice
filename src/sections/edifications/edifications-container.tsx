import SectionsHeader from "@/components/sections-header/sections-header";
import { Building } from "lucide-react";
import React from "react";
import EdificationsListContainer from "./list/edifications-list-container";
import { SearchParamsPagination } from "@/lib/types/pagination";
import { modalTypes } from "@/components/modal/types/modalTypes";

interface Props {
  searchParams: SearchParamsPagination;
}

export default function EdificationsContainer({ searchParams }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<Building />}
        sectionTitle="Gestión de Edificaciones"
        sectionDescription="Gestione la edificaciones usadas para la inspección de deterioros"
        addButton={{
          isModalRedirect: true,
          buttonText: "Nueva Edificación",
          creationPath: modalTypes.newEdificationModal.name,
        }}
      />
      <EdificationsListContainer searchParams={searchParams} />
    </div>
  );
}
