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
import useCreateEdification from "../../hooks/use-create-edification";
import {
  EdificationCreate,
  edificationCreateSchema,
} from "./schemas/edification-create-schema";
import EdificationForm from "../edification-form";

export default function NewEdificationFormContainer() {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, createEdification } = useCreateEdification({
    onCreateAction: () => {
      toast.success("Edificaión creada con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.edifications.multipleTag);
    },
  });
  const form = useForm<EdificationCreate>({
    resolver: zodResolver(edificationCreateSchema),
    defaultValues: {
      nombre: "",
      direccion: "",
      position: { coordX: -82.3666, coordY: 23.1136 },
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newEdificationModal.name);
  };

  function onSubmit(edification: EdificationCreate) {
    createEdification(edification);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <EdificationForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Crear Edificación
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
