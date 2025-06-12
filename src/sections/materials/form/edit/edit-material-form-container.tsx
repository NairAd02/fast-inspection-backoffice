"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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

interface Props {
  material: Material;
}

export default function EditMaterialFormContainer({ material }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const { loading: submitLoading, editMaterial } = useEditMaterial({
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
        <MaterialForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Crear Material
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
