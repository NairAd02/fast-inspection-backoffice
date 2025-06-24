"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import FormActionButtons from "@/components/form/form-action-buttons/form-action-buttons";
import useVerifyCode from "../../hooks/use-verify-code";
import { VerifyCode, verifyCodeSchema } from "./shcemas/verify-code-schema";
import VerifyCodeForm from "./verify-code-form";

interface Props {
  userId: string;
}

export default function VerifyCodeFormContainer({ userId }: Props) {
  const { handleOpenModal, handleCloseModal } = useContext(ModalContext);

  const {
    loading: submitLoading,
    verifyCode: verifyCodeAction,
    error,
  } = useVerifyCode({
    onVerifyCodeAction: () => {
      toast.success("Código verificado con éxito");
      handleOpenModal({
        name: modalTypes.changePasswordForgotModal.name,
        entity: userId,
      });
      handleClose();
    },
  });
  const form = useForm<VerifyCode>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      codigoActivacion: "",
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.verifyCodeModal.name);
  };

  function onSubmit(verifyCode: VerifyCode) {
    verifyCodeAction(verifyCode, userId);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <VerifyCodeForm error={error} />
        <FormActionButtons
          submitButtonText="Enviar Código de Verificación"
          submitLoading={submitLoading}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
