"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import NewMaterialFormContainer from "./new-material-form-container";

export default function NewMaterialModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.newMaterialModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;

  return <NewMaterialFormContainer subsystemId={id as string} />;
}
