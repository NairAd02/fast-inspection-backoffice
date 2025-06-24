"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import ChangePasswordForgotFormContainer from "./change-password-forgot-form-containter";

export default function ChangePasswordForgotFormModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.changePasswordForgotModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;

  return <ChangePasswordForgotFormContainer userId={id as string} />;
}
