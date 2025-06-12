"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import NewSubsystemFormContainer from "./new-subsystem-form-contianer";

export default function NewSubsystemModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.newSubsystemModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;

  return <NewSubsystemFormContainer systemId={id as string} />;
}
