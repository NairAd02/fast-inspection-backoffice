"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import {
  MaterialCreate,
  materialCreateSchema,
} from "./schemas/material-create-schema";
import useCreateMaterial from "../../hooks/use-create-material";
import MaterialForm from "../material-form";
import FormActionButtons from "@/components/form/form-action-buttons/form-action-buttons";

interface Props {
  subsystemId: string;
}

export default function NewMaterialFormContainer({ subsystemId }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const {
    loading: submitLoading,
    createMaterial,
    error,
  } = useCreateMaterial({
    onCreateAction: () => {
      toast.success("Material creado con éxito");
      handleClose();
      revalidateConfigInformation();
    },
  });
  const form = useForm<MaterialCreate>({
    resolver: zodResolver(materialCreateSchema),
    defaultValues: {
      nombre: "",
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newMaterialModal.name);
  };

  function onSubmit(materialCreate: MaterialCreate) {
    createMaterial(materialCreate, subsystemId);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <MaterialForm error={error} />
        <FormActionButtons
          submitButtonText="Crear Material"
          submitLoading={submitLoading}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
