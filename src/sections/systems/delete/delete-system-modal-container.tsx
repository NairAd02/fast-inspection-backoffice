"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { toast } from "react-toastify";
import useDeleteSystem from "../hooks/use-delete-system";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";

export default function DeleteSystemModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const infoModal = getInfoModal(modalTypes.deleteSystemModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const actionExecute =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;
  const { deleteSystem, loading } = useDeleteSystem({
    id,
    onDeleteAction: () => {
      toast.success("Sistema eliminado con éxito");
      onCloseModal();
      revalidateConfigInformation();
      if (actionExecute) actionExecute();
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.deleteSystemModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={modalTypes.deleteSystemModal.title || "Elminación del Sistema"}
      message={modalTypes.deleteSystemModal.message}
      warningMessage={modalTypes.deleteSystemModal.warningMessage}
      onConfirm={deleteSystem}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
