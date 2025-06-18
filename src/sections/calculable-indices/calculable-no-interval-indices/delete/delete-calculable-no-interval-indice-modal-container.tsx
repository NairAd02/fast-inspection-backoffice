"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import useDeleteCalculableIndice from "../../hooks/use-delete-calculable-indice";

export default function DeleteCalculableNoIntervalIndiceModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const infoModal = getInfoModal(
    modalTypes.deleteCalculableNoIntervalIndiceModal.name
  );
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const actionExecute =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;
  const { deleteIndiceCalculable, loading } = useDeleteCalculableIndice({
    id,
    onDeleteAction: () => {
      toast.success("Índice Calculable eliminado con éxito");
      onCloseModal();
      revalidateConfigInformation();
      if (actionExecute) actionExecute();
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.deleteCalculableNoIntervalIndiceModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={
        modalTypes.deleteCalculableNoIntervalIndiceModal.title ||
        "Elminación del Índice Calculable"
      }
      message={modalTypes.deleteCalculableNoIntervalIndiceModal.message}
      warningMessage={
        modalTypes.deleteCalculableNoIntervalIndiceModal.warningMessage
      }
      onConfirm={deleteIndiceCalculable}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
