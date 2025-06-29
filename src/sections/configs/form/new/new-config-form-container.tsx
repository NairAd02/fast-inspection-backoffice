"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
import FormActionButtons from "@/components/form/form-action-buttons/form-action-buttons";

interface Props {
  replicateConfig?: ConfigDetails;
  actionExecute?: () => void;
}

export default function NewConfigFormContainer({
  replicateConfig,
  actionExecute,
}: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, createConfig, error } = useCreateConfig({
    onCreateAction: () => {
      toast.success("Configuración creada con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.configs.multipleTag);
      if (actionExecute) actionExecute();
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
    handleCloseModal(
      !replicateConfig
        ? modalTypes.newConfigModal.name
        : modalTypes.replicateConfigModal.name
    );
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
        <ConfigForm replicateConfig={replicateConfig} error={error} />
        <FormActionButtons
          submitButtonText="Crear Configuración"
          submitLoading={submitLoading}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
