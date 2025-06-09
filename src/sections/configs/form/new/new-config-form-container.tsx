"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { toast } from "react-toastify";
import {
  ConfigCreate,
  configCreateSchema,
} from "./schemas/config-create-schema";
import useCreateConfig from "../../hooks/use-create-config";
import { revalidateServerTags } from "@/lib/cache";
import ConfigForm from "../config-form";
import { ConfigDetails } from "@/lib/types/configs";

interface Props {
  replicateConfig?: ConfigDetails;
}

export default function NewConfigFormContainer({ replicateConfig }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, createConfig } = useCreateConfig({
    onCreateAction: () => {
      toast.success("Configuración creada con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.configs.multipleTag);
    },
  });
  const form = useForm<ConfigCreate>({
    resolver: zodResolver(configCreateSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      configReplicate: replicateConfig
        ? replicateConfig.version.toString()
        : "",
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newConfigModal.name);
  };

  function onSubmit(config: ConfigCreate) {
    createConfig(config);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <ConfigForm replicateConfig={replicateConfig} />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Crear Configuración
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
