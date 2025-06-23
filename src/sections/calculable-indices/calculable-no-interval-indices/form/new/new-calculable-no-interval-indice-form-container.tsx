"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import useCreateCalculableNoIntervalIndice from "../../hooks/use-create-calculable-no-interval-indice";
import {
  CalculableNoIntervalIndiceCreate,
  calculableNoIntervalIndiceCreateSchema,
} from "./schemas/calculable-no-interval-indice-create-schema";
import { Calculos } from "@/lib/types/calculable-indices";
import CalculableNoIntervalIndiceForm from "../calculable-no-interval-indice-form";
import FormActionButtons from "@/components/form/form-action-buttons/form-action-buttons";

interface Props {
  configVersion: string;
  fetchCalculableNoIntervalIndices: () => Promise<void>;
}

export default function NewCalculableNoIntervalIndiceFormContainer({
  configVersion,
  fetchCalculableNoIntervalIndices,
}: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const { loading: submitLoading, createCalculableNoIntervalIndice } =
    useCreateCalculableNoIntervalIndice({
      onCreateAction: () => {
        toast.success("Índice calculable sin intervalo creado con éxito");
        handleClose();
        revalidateConfigInformation();
        fetchCalculableNoIntervalIndices();
      },
    });
  const form = useForm<CalculableNoIntervalIndiceCreate>({
    resolver: zodResolver(calculableNoIntervalIndiceCreateSchema),
    defaultValues: {
      nombre: "",
      calculo: Calculos.Criticidad,
      indicadoresSinIntervalos: [],
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newCalculableNoIntervalIndiceModal.name);
  };

  function onSubmit(
    calculableNoIntervalIndice: CalculableNoIntervalIndiceCreate
  ) {
    createCalculableNoIntervalIndice(calculableNoIntervalIndice, configVersion);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <CalculableNoIntervalIndiceForm />
        <FormActionButtons
          submitButtonText="Crear Índice Calculable"
          submitLoading={submitLoading}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
