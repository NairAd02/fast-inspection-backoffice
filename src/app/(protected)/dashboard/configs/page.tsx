import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { SearchParamsPagination } from "@/lib/types/pagination";
import ConfigsContainer from "@/sections/configs/configs-container";
import DeleteConfigModalContainer from "@/sections/configs/delete/delete-config-modal-container";
import EditConfigModalContainer from "@/sections/configs/form/edit/edit-config-modal-container";
import NewConfigFormContainer from "@/sections/configs/form/new/new-config-form-container";
import ReplicateConfigModalContainer from "@/sections/configs/form/replicate/replicate-config-modal-container";
import MarkConfigAsActiveModalContainer from "@/sections/configs/mark-as-active/mark-config-as-active-modal-container";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function ConfigsPage({ searchParams }: Props) {
  return (
    <>
      <ConfigsContainer searchParams={await searchParams} />
      <Modal
        formPath={modalTypes.newConfigModal.name}
        title={modalTypes.newConfigModal.title}
      >
        <NewConfigFormContainer />
      </Modal>
      <Modal
        formPath={modalTypes.editConfigModal.name}
        title={modalTypes.editConfigModal.title}
        className="min-h-[36vh]"
      >
        <EditConfigModalContainer />
      </Modal>
      <Modal
        formPath={modalTypes.deleteConfigModal.name}
        title={modalTypes.deleteConfigModal.title}
      >
        <DeleteConfigModalContainer />
      </Modal>
      <Modal
        formPath={modalTypes.markConfigAsActiveModal.name}
        title={modalTypes.markConfigAsActiveModal.title}
      >
        <MarkConfigAsActiveModalContainer />
      </Modal>
      <Modal
        formPath={modalTypes.replicateConfigModal.name}
        title={modalTypes.replicateConfigModal.title}
        className="min-h-[36vh]"
      >
        <ReplicateConfigModalContainer />
      </Modal>
    </>
  );
}
