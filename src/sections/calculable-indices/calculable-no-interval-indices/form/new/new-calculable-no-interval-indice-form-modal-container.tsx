"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import NewCalculableNoIntervalIndiceFormContainer from "./new-calculable-no-interval-indice-form-container";

export default function NewCalculableNoIntervalIndiceModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(
    modalTypes.newCalculableNoIntervalIndiceModal.name
  );
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const fetchCalculableNoIntervalIndices =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;

  return (
    <NewCalculableNoIntervalIndiceFormContainer
      configVersion={id as string}
      fetchCalculableNoIntervalIndices={
        fetchCalculableNoIntervalIndices as () => Promise<void>
      }
    />
  );
}
