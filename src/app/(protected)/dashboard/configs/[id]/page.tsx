import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import ConfigManagementContainer from "@/sections/configs/config-management/config-management-container";
import { RevalidateConfigInformationProvider } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import NewMaterialModalContainer from "@/sections/materials/form/new/new-material-form-modal-container";
import DeleteSubsystemModalContainer from "@/sections/subsystems/delete/delete-subsystem-modal-container";
import EditSubsystemModalContainer from "@/sections/subsystems/form/edit/edit-subsystem-form-modal-container";
import NewSubsystemModalContainer from "@/sections/subsystems/form/new/new-subsystem-form-modal-container";
import DeleteSystemModalContainer from "@/sections/systems/delete/delete-system-modal-container";
import EditSystemModalContainer from "@/sections/systems/form/edit/edit-system-form-modal-containter";
import NewSystemModalContainer from "@/sections/systems/form/new/new-system-form-modal-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ConfigManagementPage({ params }: Props) {
  const id = (await params).id;
  return (
    <>
      <RevalidateConfigInformationProvider configVersion={id}>
        <ConfigManagementContainer version={id} />
        {/* Modals Systems */}
        <Modal
          formPath={modalTypes.newSystemModal.name}
          title={modalTypes.newSystemModal.title}
        >
          <NewSystemModalContainer />
        </Modal>
        <Modal
          formPath={modalTypes.editSystemModal.name}
          title={modalTypes.editSystemModal.title}
        >
          <EditSystemModalContainer />
        </Modal>
        <Modal
          formPath={modalTypes.deleteSystemModal.name}
          title={modalTypes.deleteSystemModal.title}
        >
          <DeleteSystemModalContainer />
        </Modal>

        {/* Modals Subsystems */}
        <Modal
          formPath={modalTypes.newSubsystemModal.name}
          title={modalTypes.newSubsystemModal.title}
        >
          <NewSubsystemModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.editSubsystemModal.name}
          title={modalTypes.editSubsystemModal.title}
        >
          <EditSubsystemModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.deleteSubsystemModal.name}
          title={modalTypes.deleteSubsystemModal.title}
        >
          <DeleteSubsystemModalContainer />
        </Modal>

        {/* Modals Materials */}
        <Modal
          formPath={modalTypes.newMaterialModal.name}
          title={modalTypes.newMaterialModal.title}
        >
          <NewMaterialModalContainer />
        </Modal>
      </RevalidateConfigInformationProvider>
    </>
  );
}
