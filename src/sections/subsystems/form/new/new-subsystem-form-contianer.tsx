"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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

interface Props {
  systemId: string;
}

export default function NewSubsystemFormContainer({ systemId }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const { loading: submitLoading, createSubsystem } = useCreateSubsystem({
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
        <SubsystemForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Crear Subsistema
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
