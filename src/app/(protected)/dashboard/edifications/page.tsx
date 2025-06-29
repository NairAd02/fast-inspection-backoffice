import React from "react";
import EdificationsContainer from "@/sections/edifications/edifications-container";
import { SearchParamsPagination } from "@/lib/types/pagination";
import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import EdificationDetailsModalContainer from "@/sections/edifications/details/edification-details-modal-container";
import NewEdificationFormContainer from "@/sections/edifications/form/new/new-edification-form-container";
import DeleteEdificationModalContainer from "@/sections/edifications/delete/delete-edification-modal-container";
import EditEdificationModalContainer from "@/sections/edifications/form/edit/edit-edification-form-modal-container";
import { Metadata } from "next";
import { Building2 } from "lucide-react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export const metadata: Metadata = {
  title: "Gestión de Edificaciones",
  description:
    "Administre las edificaciones a las cuales se les realizarán las inspecciones",
};

export default async function EdificationsPage({ searchParams }: Props) {
  return (
    <>
      <EdificationsContainer searchParams={await searchParams} />
      <Modal
        formPath={modalTypes.newEdificationModal.name}
        title={modalTypes.newEdificationModal.title}
        maxWidth="max-w-2xl"
        icon={<Building2 />}
      >
        <NewEdificationFormContainer />
      </Modal>

      <Modal
        formPath={modalTypes.editEdificationModal.name}
        title={modalTypes.editEdificationModal.title}
        maxWidth="max-w-2xl"
        className="min-h-[70vh]"
        icon={<Building2 />}
      >
        <EditEdificationModalContainer />
      </Modal>

      <Modal
        formPath={modalTypes.detailsEdificationModal.name}
        title={modalTypes.detailsEdificationModal.title}
        maxWidth="max-w-4xl"
        className="min-h-[70vh] max-h-[90vh]"
        icon={<Building2 />}
      >
        <EdificationDetailsModalContainer />
      </Modal>

      <Modal
        formPath={modalTypes.deleteEdificationModal.name}
        title={modalTypes.deleteEdificationModal.title}
        icon={<Building2 />}
      >
        <DeleteEdificationModalContainer />
      </Modal>
    </>
  );
}
