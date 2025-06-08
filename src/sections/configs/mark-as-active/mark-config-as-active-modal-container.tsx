"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { toast } from "react-toastify";
import useMarkConfigAsActive from "../hooks/use-mark-config-as-active";

export default function MarkConfigAsActiveModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.markConfigAsActiveModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { markConfigAsActive, loading } = useMarkConfigAsActive({
    id,
    onMarkConfigAsActiveAction: () => {
      toast.success("Configuración activada con éxito");
      onCloseModal();
      revalidateServerTags(tagsCacheByRoutes.configs.multipleTag);
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.markConfigAsActiveModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={
        modalTypes.markConfigAsActiveModal.title ||
        "Cambio de estado de la Configuración"
      }
      message={modalTypes.markConfigAsActiveModal.message}
      warningMessage={modalTypes.markConfigAsActiveModal.warningMessage}
      onConfirm={markConfigAsActive}
      onCancel={onCloseModal}
      isLoading={loading}
    />
  );
}
