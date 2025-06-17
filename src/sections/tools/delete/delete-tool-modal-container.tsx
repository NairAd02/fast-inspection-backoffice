"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import useDeleteTool from "../hooks/use-delete-tool";

export default function DeleteToolModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const infoModal = getInfoModal(modalTypes.deleteToolModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const actionExecute =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;
  const { deleteTool, loading } = useDeleteTool({
    id,
    onDeleteAction: () => {
      toast.success("Herramienta eliminada con éxito");
      onCloseModal();
      revalidateConfigInformation();
      if (actionExecute) actionExecute();
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.deleteToolModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={modalTypes.deleteToolModal.title || "Elminación de la Herramienta"}
      message={modalTypes.deleteToolModal.message}
      warningMessage={modalTypes.deleteToolModal.warningMessage}
      onConfirm={deleteTool}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
