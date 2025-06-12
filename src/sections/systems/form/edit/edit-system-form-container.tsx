"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import SystemForm from "../system-form";
import { System } from "@/lib/types/systems";
import useEditSystem from "../../hooks/use-edit-system";
import { SystemEdit, systemEditSchema } from "./schemas/system-edit-schema";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";

interface Props {
  system: System;
}

export default function EditSystemFormContainer({ system }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const { loading: submitLoading, editSystem } = useEditSystem({
    id: system.id.toString(),
    onEditAction: () => {
      toast.success("Sistema editado con éxito");
      handleClose();
      revalidateConfigInformation();
    },
  });
  const form = useForm<SystemEdit>({
    resolver: zodResolver(systemEditSchema),
    defaultValues: {
      nombre: system.nombre,
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editSystemModal.name);
  };

  function onSubmit(systemEdit: SystemEdit) {
    editSystem(systemEdit);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <SystemForm editMode />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Editar Sistema
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
