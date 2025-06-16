"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import { ToolCreate, toolCreateSchema } from "./schemas/tool-create-schema";
import useCreateTool from "../../hooks/use-create-tool";
import ToolForm from "../tool-form";

interface Props {
  configVersion: string;
  fetchTools: () => Promise<void>;
}

export default function NewToolFormContainer({
  configVersion,
  fetchTools,
}: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const { loading: submitLoading, createTool } = useCreateTool({
    onCreateAction: () => {
      toast.success("Herramienta creada con éxito");
      handleClose();
      fetchTools();
      revalidateConfigInformation();
    },
  });
  const form = useForm<ToolCreate>({
    resolver: zodResolver(toolCreateSchema),
    defaultValues: {
      nombre: "",
      campos: [],
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newToolModal.name);
  };

  function onSubmit(toolCreate: ToolCreate) {
    createTool(toolCreate, configVersion);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <ToolForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Crear Herramienta
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
