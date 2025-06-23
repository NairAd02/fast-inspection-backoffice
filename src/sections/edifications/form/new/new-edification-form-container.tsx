"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useCreateEdification from "../../hooks/use-create-edification";
import EdificationForm from "../edification-form";
import {
  EdificationCreate,
  edificationCreateSchema,
} from "./schemas/edification-create-schema";
import FormActionButtons from "@/components/form/form-action-buttons/form-action-buttons";

export default function NewEdificationFormContainer() {
  const { handleCloseModal } = useContext(ModalContext);
  const {
    loading: submitLoading,
    createEdification,
    error,
  } = useCreateEdification({
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
        <EdificationForm error={error} />
        <FormActionButtons
          submitButtonText="Crear Edificación"
          submitLoading={submitLoading}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
