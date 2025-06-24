"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import VerifyCodeFormContainer from "./verify-code-form-container";

export default function VerifyCodeFormModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.verifyCodeModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;

  return <VerifyCodeFormContainer userId={id as string} />;
}
