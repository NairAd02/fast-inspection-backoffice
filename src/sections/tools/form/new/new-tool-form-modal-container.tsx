"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import NewToolFormContainer from "./new-tool-form-container";

export default function NewToolFormModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.newToolModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const fetchTools =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;

  return (
    <NewToolFormContainer
      configVersion={id as string}
      fetchTools={fetchTools as () => Promise<void>}
    />
  );
}
