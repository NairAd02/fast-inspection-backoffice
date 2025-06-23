"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import { Calculos } from "@/lib/types/calculable-indices";
import useCreateCalculableIntervalIndice from "../../hooks/use-create-calculable-interval-indice";
import {
  CalculableIntervalIndiceCreate,
  calculableIntervalIndiceCreateSchema,
} from "./schemas/calculable-interval-indice-create-schema";
import CalculableIntervalIndiceForm from "../calculable-interval-indice-form";
import FormActionButtons from "@/components/form/form-action-buttons/form-action-buttons";

interface Props {
  configVersion: string;
  fetchCalculableIntervalIndices: () => Promise<void>;
}

export default function NewCalculableIntervalIndiceFormContainer({
  configVersion,
  fetchCalculableIntervalIndices,
}: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const { loading: submitLoading, createCalculableIntervalIndice } =
    useCreateCalculableIntervalIndice({
      onCreateAction: () => {
        toast.success("Índice calculable con intervalo creado con éxito");
        handleClose();
        revalidateConfigInformation();
        fetchCalculableIntervalIndices();
      },
    });
  const form = useForm<CalculableIntervalIndiceCreate>({
    resolver: zodResolver(calculableIntervalIndiceCreateSchema),
    defaultValues: {
      nombre: "",
      calculo: Calculos.Criticidad,
      indicadoresIntervalos: [],
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newCalculableIntervalIndiceModal.name);
  };

  function onSubmit(calculableIntervalIndice: CalculableIntervalIndiceCreate) {
    createCalculableIntervalIndice(calculableIntervalIndice, configVersion);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <CalculableIntervalIndiceForm />
        <FormActionButtons
          submitButtonText="Crear Índice Calculable"
          submitLoading={submitLoading}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
