import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import ConfigManagementContainer from "@/sections/configs/config-management/config-management-container";
import NewSystemModalContainer from "@/sections/systems/form/new/new-system-form-modal-container";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ConfigManagementPage({ params }: Props) {
  const id = (await params).id;
  return (
    <>
      <ConfigManagementContainer version={id} />
      <Modal
        formPath={modalTypes.newSystemModal.name}
        title={modalTypes.newSystemModal.title}
      >
        <NewSystemModalContainer />
      </Modal>
    </>
  );
}
