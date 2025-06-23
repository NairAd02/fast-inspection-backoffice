"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import MaterialForm from "../material-form";
import { Material } from "@/lib/types/materials";
import {
  MaterialEdit,
  materialEditSchema,
} from "./schemas/material-edit-schema";
import useEditMaterial from "../../hooks/use-edit-material";
import FormActionButtons from "@/components/form/form-action-buttons/form-action-buttons";

interface Props {
  material: Material;
}

export default function EditMaterialFormContainer({ material }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const {
    loading: submitLoading,
    editMaterial,
    error,
  } = useEditMaterial({
    id: material.id.toString(),
    onEditAction: () => {
      toast.success("Material edición con éxito");
      handleClose();
      revalidateConfigInformation();
    },
  });
  const form = useForm<MaterialEdit>({
    resolver: zodResolver(materialEditSchema),
    defaultValues: {
      nombre: material.nombre,
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editMaterialModal.name);
  };

  function onSubmit(materialEdit: MaterialEdit) {
    editMaterial(materialEdit);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <MaterialForm error={error} />
        <FormActionButtons
          submitButtonText="Editar Material"
          submitLoading={submitLoading}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
