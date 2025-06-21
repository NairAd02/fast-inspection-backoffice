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
import EdificationForm from "../edification-form";
import { EdificationDetails } from "@/lib/types/edifications";
import useEditEdification from "../../hooks/use-edit-edification";
import {
  EdificationEdit,
  edificationEditSchema,
} from "./schemas/edification-edit-schema";

interface Props {
  edification: EdificationDetails;
}

export default function EditEdificationFormContainer({ edification }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, editEdification } = useEditEdification({
    id: edification.id.toString(),
    onEditAction: () => {
      toast.success("Edificaión editada con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.edifications.multipleTag);
    },
  });
  const form = useForm<EdificationEdit>({
    resolver: zodResolver(edificationEditSchema),
    defaultValues: {
      nombre: edification.nombre,
      direccion: edification.direccion,
      position: { coordX: edification.coordY, coordY: edification.coordX },
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editEdificationModal.name);
  };

  function onSubmit(edification: EdificationEdit) {
    editEdification(edification);
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
            Editar Edificación
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
