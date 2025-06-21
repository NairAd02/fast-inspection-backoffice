import React from "react";
import EdificationsContainer from "@/sections/edifications/edifications-container";
import { SearchParamsPagination } from "@/lib/types/pagination";
import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import EdificationDetailsModalContainer from "@/sections/edifications/details/edification-details-modal-container";
import NewEdificationFormContainer from "@/sections/edifications/form/new/new-edification-form-container";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function EdificationsPage({ searchParams }: Props) {
  return (
    <>
      <EdificationsContainer searchParams={await searchParams} />
      <Modal
        formPath={modalTypes.newEdificationModal.name}
        title={modalTypes.newEdificationModal.title}
        maxWidth="max-w-2xl"
      >
        <NewEdificationFormContainer />
      </Modal>
      <Modal
        formPath={modalTypes.detailsEdificationModal.name}
        title={modalTypes.detailsEdificationModal.title}
        maxWidth="max-w-4xl"
        className="min-h-[70vh] max-h-[90vh]"
      >
        <EdificationDetailsModalContainer />
      </Modal>
    </>
  );
}
