"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { toast } from "react-toastify";
import useDeleteConfig from "../hooks/use-delete-config";

export default function DeleteConfigModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.deleteConfigModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const actionExecute =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;
  const { deleteConfig, loading } = useDeleteConfig({
    id,
    onDeleteAction: () => {
      toast.success("Configuración eliminada con éxito");
      onCloseModal();
      revalidateServerTags(tagsCacheByRoutes.configs.multipleTag);
      if (actionExecute) actionExecute();
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.deleteConfigModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={
        modalTypes.deleteConfigModal.title || "Elminación de la Configuración"
      }
      message={modalTypes.deleteConfigModal.message}
      warningMessage={modalTypes.deleteConfigModal.warningMessage}
      onConfirm={deleteConfig}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
