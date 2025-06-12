"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import useDeleteSubsystem from "../hooks/use-delete-subsystem";

export default function DeleteSubsystemModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const infoModal = getInfoModal(modalTypes.deleteSubsystemModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const actionExecute =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;
  const { deleteSubsystem, loading } = useDeleteSubsystem({
    id,
    onDeleteAction: () => {
      toast.success("Subsistema eliminado con éxito");
      onCloseModal();
      revalidateConfigInformation();
      if (actionExecute) actionExecute();
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.deleteSubsystemModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={
        modalTypes.deleteSubsystemModal.title || "Elminación del Subsistema"
      }
      message={modalTypes.deleteSubsystemModal.message}
      warningMessage={modalTypes.deleteSubsystemModal.warningMessage}
      onConfirm={deleteSubsystem}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
