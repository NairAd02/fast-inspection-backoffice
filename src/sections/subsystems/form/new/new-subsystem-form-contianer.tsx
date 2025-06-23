"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import {
  SubsystemCreate,
  subsystemCreateSchema,
} from "./schemas/subsystem-create-schema";
import useCreateSubsystem from "../../hooks/use-create-subsystem";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import SubsystemForm from "../subsystem-form";
import FormActionButtons from "@/components/form/form-action-buttons/form-action-buttons";

interface Props {
  systemId: string;
}

export default function NewSubsystemFormContainer({ systemId }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const {
    loading: submitLoading,
    createSubsystem,
    error,
  } = useCreateSubsystem({
    onCreateAction: () => {
      toast.success("Subsistema creado con éxito");
      handleClose();
      revalidateConfigInformation();
    },
  });
  const form = useForm<SubsystemCreate>({
    resolver: zodResolver(subsystemCreateSchema),
    defaultValues: {
      nombre: "",
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newSubsystemModal.name);
  };

  function onSubmit(subsystem: SubsystemCreate) {
    createSubsystem(subsystem, systemId);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <SubsystemForm error={error} />
        <FormActionButtons
          submitButtonText="Crear Subsistema"
          submitLoading={submitLoading}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
