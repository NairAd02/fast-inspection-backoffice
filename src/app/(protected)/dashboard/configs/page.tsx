import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import ConfigsContainer from "@/sections/configs/configs-container";
import EditConfigModalContainer from "@/sections/configs/form/edit/edit-config-modal-container";
import NewConfigFormContainer from "@/sections/configs/form/new/new-config-form-container";
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
        className="min-h-[45vh]"
      >
        <EditConfigModalContainer />
      </Modal>
    </>
  );
}
