"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import {
  DeteriorationTypeCreate,
  deteriorationTypeCreateSchema,
} from "./schemas/deterioration-type-create-schema";
import useCreateDeteriorationType from "../../hooks/use-create-deterioration-type";
import DeteriorationTypeForm from "../deterioration-type-form";

interface Props {
  materialId: string;
}

export default function NewDeteriorationFormContainer({ materialId }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const { loading: submitLoading, createDeteriorationType } =
    useCreateDeteriorationType({
      onCreateAction: () => {
        toast.success("Tipo de Deterioro creado con éxito");
        handleClose();
        revalidateConfigInformation();
      },
    });
  const form = useForm<DeteriorationTypeCreate>({
    resolver: zodResolver(deteriorationTypeCreateSchema),
    defaultValues: {
      nombre: "",
      detectabilidad: 1,
      causas: [],
      camposAfectados: [],
      camposDefinidosImagen: [],
      camposDefinidosNumericos: [],
      camposDefinidosSeleccion: [],
      camposDefinidosTexto: [],
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newDeteriorationTypeModal.name);
  };

  function onSubmit(deteriorationTypeCreate: DeteriorationTypeCreate) {
    createDeteriorationType(deteriorationTypeCreate, materialId);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <DeteriorationTypeForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Crear Tipo de Deterioro
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
