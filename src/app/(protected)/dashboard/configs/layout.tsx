import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import DeleteConfigModalContainer from "@/sections/configs/delete/delete-config-modal-container";
import EditConfigModalContainer from "@/sections/configs/form/edit/edit-config-modal-container";
import NewConfigFormContainer from "@/sections/configs/form/new/new-config-form-container";
import ReplicateConfigModalContainer from "@/sections/configs/form/replicate/replicate-config-modal-container";
import MarkConfigAsActiveModalContainer from "@/sections/configs/mark-as-active/mark-config-as-active-modal-container";
import { FolderCog } from "lucide-react";
import React from "react";

export default function Configlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Modal
        formPath={modalTypes.newConfigModal.name}
        title={modalTypes.newConfigModal.title}
        icon={<FolderCog />}
      >
        <NewConfigFormContainer />
      </Modal>
      <Modal
        formPath={modalTypes.editConfigModal.name}
        title={modalTypes.editConfigModal.title}
        className="min-h-[36vh]"
        icon={<FolderCog />}
      >
        <EditConfigModalContainer />
      </Modal>
      <Modal
        formPath={modalTypes.deleteConfigModal.name}
        title={modalTypes.deleteConfigModal.title}
        icon={<FolderCog />}
      >
        <DeleteConfigModalContainer />
      </Modal>
      <Modal
        formPath={modalTypes.markConfigAsActiveModal.name}
        title={modalTypes.markConfigAsActiveModal.title}
        icon={<FolderCog />}
      >
        <MarkConfigAsActiveModalContainer />
      </Modal>
      <Modal
        formPath={modalTypes.replicateConfigModal.name}
        title={modalTypes.replicateConfigModal.title}
        className="min-h-[36vh]"
        icon={<FolderCog />}
      >
        <ReplicateConfigModalContainer />
      </Modal>
    </>
  );
}
