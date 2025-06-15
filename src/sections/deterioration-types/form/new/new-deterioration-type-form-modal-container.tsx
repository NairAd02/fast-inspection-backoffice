"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import NewDeteriorationFormContainer from "./new-deterioration-type-form-container";


export default function NewDeteriorationTypeModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.newDeteriorationTypeModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const toolId =
    infoModal && infoModal.secondaryEntity ? infoModal.secondaryEntity : null;
  return (
    <NewDeteriorationFormContainer
      materialId={id as string}
      toolId={toolId as string}
    />
  );
}
