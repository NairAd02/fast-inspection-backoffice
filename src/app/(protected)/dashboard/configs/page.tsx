import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import ConfigsContainer from "@/sections/configs/configs-container";
import DeleteConfigModalContainer from "@/sections/configs/delete/delete-config-modal-container";
import EditConfigModalContainer from "@/sections/configs/form/edit/edit-config-modal-container";
import NewConfigFormContainer from "@/sections/configs/form/new/new-config-form-container";
import MarkConfigAsActiveModalContainer from "@/sections/configs/mark-as-active/mark-config-as-active-modal-container";
import React from "react";

export default function ConfigsPage() {
  return (
    <>
      <ConfigsContainer />
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
    </>
  );
}
