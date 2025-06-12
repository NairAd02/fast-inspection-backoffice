"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { toast } from "react-toastify";
import useDeleteSystem from "../hooks/use-delete-system";

export default function DeleteSystemModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.deleteSystemModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const configVersion =
    infoModal && infoModal.secondaryEntity ? infoModal.secondaryEntity : null;
  const actionExecute =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;
  const { deleteSystem, loading } = useDeleteSystem({
    id,
    onDeleteAction: () => {
      toast.success("Sistema eliminado con éxito");
      onCloseModal();
      revalidateServerTags(
        tagsCacheByRoutes.configs.systemsTag + ": " + configVersion
      );
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
