"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import useDeleteDeteriorationType from "../hooks/use-delete-deterioration-type";

export default function DeleteDeteriorationTypeModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const infoModal = getInfoModal(modalTypes.deleteDeteriorationTypeModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const actionExecute =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;
  const { deleteDeteriorationType, loading } = useDeleteDeteriorationType({
    id,
    onDeleteAction: () => {
      toast.success("Tipo de Deterioro eliminado con éxito");
      onCloseModal();
      revalidateConfigInformation();
      if (actionExecute) actionExecute();
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.deleteDeteriorationTypeModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={
        modalTypes.deleteDeteriorationTypeModal.title ||
        "Elminación del Material"
      }
      message={modalTypes.deleteDeteriorationTypeModal.message}
      warningMessage={modalTypes.deleteDeteriorationTypeModal.warningMessage}
      onConfirm={deleteDeteriorationType}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
