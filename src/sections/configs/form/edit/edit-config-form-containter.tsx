"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { toast } from "react-toastify";
import { revalidateServerTags } from "@/lib/cache";
import ConfigForm from "../config-form";
import { ConfigEdit, configEditSchema } from "./schemas/config-edit-schema";
import { ConfigDetails } from "@/lib/types/configs";
import useEditConfig from "../../hooks/use-edit-config";

interface Props {
  config: ConfigDetails;
}

export default function EditConfigFormContainer({ config }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, editConfig } = useEditConfig({
    id: config.version.toString(),
    onEditAction: () => {
      toast.success("Configuración editada con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.configs.multipleTag);
      revalidateServerTags(
        tagsCacheByRoutes.configs.singleTag + ": " + config.version
      );
    },
  });
  const form = useForm<ConfigEdit>({
    resolver: zodResolver(configEditSchema),
    defaultValues: {
      nombre: config.nombre,
      descripcion: config.descripcion,
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editConfigModal.name);
  };

  function onSubmit(config: ConfigEdit) {
    editConfig(config);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <ConfigForm editMode />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Editar Configuración
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
