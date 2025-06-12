"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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

interface Props {
  subsystem: Subsystem;
}

export default function EditSubsystemFormContainer({ subsystem }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const { loading: submitLoading, editSubsystem } = useEditSubsystem({
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
        <SubsystemForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Editar Subsistema
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
