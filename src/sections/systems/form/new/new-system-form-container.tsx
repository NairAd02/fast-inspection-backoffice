"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import useCreateSystem from "../../hooks/use-create-system";
import {
  SystemCreate,
  systemCreateSchema,
} from "./schemas/system-create-schema";
import SystemForm from "../system-form";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";

interface Props {
  configVersion: string;
}

export default function NewSystemFormContainer({ configVersion }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const { loading: submitLoading, createSystem } = useCreateSystem({
    onCreateAction: () => {
      toast.success("Sistema creado con éxito");
      handleClose();
      revalidateConfigInformation();
    },
  });
  const form = useForm<SystemCreate>({
    resolver: zodResolver(systemCreateSchema),
    defaultValues: {
      nombre: "",
      herramienta: "",
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newSystemModal.name);
  };

  function onSubmit(system: SystemCreate) {
    createSystem(system, configVersion);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <SystemForm configVersion={configVersion} />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Crear Sistema
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
