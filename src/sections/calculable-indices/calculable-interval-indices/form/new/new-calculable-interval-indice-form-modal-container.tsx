"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import NewCalculableIntervalIndiceFormContainer from "./new-calculable-interval-indice-form-container";

export default function NewCalculableIntervalIndiceModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(
    modalTypes.newCalculableIntervalIndiceModal.name
  );
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const fetchCalculableIntervalIndices =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;

  return (
    <NewCalculableIntervalIndiceFormContainer
      configVersion={id as string}
      fetchCalculableIntervalIndices={
        fetchCalculableIntervalIndices as () => Promise<void>
      }
    />
  );
}
