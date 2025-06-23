"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import SubsystemForm from "../subsystem-form";
import { Subsystem } from "@/lib/types/subsystems";
import {
  SubsystemEdit,
  subsystemEditSchema,
} from "./schemas/subsystem-edit-schema";
import useEditSubsystem from "../../hooks/use-edit-subsystem";
import FormActionButtons from "@/components/form/form-action-buttons/form-action-buttons";

interface Props {
  subsystem: Subsystem;
}

export default function EditSubsystemFormContainer({ subsystem }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const {
    loading: submitLoading,
    editSubsystem,
    error,
  } = useEditSubsystem({
    id: subsystem.id.toString(),
    onEditAction: () => {
      toast.success("Subsistema editado con éxito");
      handleClose();
      revalidateConfigInformation();
    },
  });
  const form = useForm<SubsystemEdit>({
    resolver: zodResolver(subsystemEditSchema),
    defaultValues: {
      nombre: subsystem.nombre,
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editSubsystemModal.name);
  };

  function onSubmit(subsystem: SubsystemEdit) {
    editSubsystem(subsystem);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <SubsystemForm error={error} />
        <FormActionButtons
          submitButtonText="Editar Subsistema"
          submitLoading={submitLoading}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
