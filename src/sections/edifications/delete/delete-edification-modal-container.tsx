"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { toast } from "react-toastify";
import useDeleteEdification from "../hooks/use-delete-edification";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";

export default function DeleteEdificationModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.deleteEdificationModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;

  const { deleteEdification, loading } = useDeleteEdification({
    id,
    onDeleteAction: () => {
      toast.success("Edificación eliminada con éxito");
      onCloseModal();
      revalidateServerTags(tagsCacheByRoutes.edifications.multipleTag);
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.deleteEdificationModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={
        modalTypes.deleteEdificationModal.title ||
        "Elminación de la Edificación"
      }
      message={modalTypes.deleteEdificationModal.message}
      warningMessage={modalTypes.deleteEdificationModal.warningMessage}
      onConfirm={deleteEdification}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
