"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import NewSystemFormContainer from "./new-system-form-container";

export default function NewSystemModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.newSystemModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;

  return <NewSystemFormContainer configVersion={id as string} />;
}
