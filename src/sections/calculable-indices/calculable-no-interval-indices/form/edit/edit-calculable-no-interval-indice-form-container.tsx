"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import { CalculableNoIntervalIndiceDetails } from "@/lib/types/calculable-no-interval-indices";
import useEditCalculableNoIntervalIndice from "../../hooks/use-edit-calculable-no-interval-indice";
import {
  CalculableNoIntervalIndiceEdit,
  calculableNoIntervalIndiceEditSchema,
} from "./schemas/calculable-no-interval-edit-schema";
import CalculableNoIntervalIndiceForm from "../calculable-no-interval-indice-form";
import FormActionButtons from "@/components/form/form-action-buttons/form-action-buttons";

interface Props {
  calculableNoIntervalIndice: CalculableNoIntervalIndiceDetails;
  fetchCalculableNoIntervalIndices: () => Promise<void>;
}

export default function EditCalculableNoIntervalIndiceFormContainer({
  calculableNoIntervalIndice,
  fetchCalculableNoIntervalIndices,
}: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const { loading: submitLoading, editCalculableNoIntervalIndice } =
    useEditCalculableNoIntervalIndice({
      id: calculableNoIntervalIndice.id.toString(),
      onEditAction: () => {
        toast.success("Índice Calculable editado con éxito");
        handleClose();
        fetchCalculableNoIntervalIndices();
        revalidateConfigInformation();
      },
    });
  const form = useForm<CalculableNoIntervalIndiceEdit>({
    resolver: zodResolver(calculableNoIntervalIndiceEditSchema),
    defaultValues: {
      nombre: calculableNoIntervalIndice.nombre,
      calculo: calculableNoIntervalIndice.calculo,
      indicadoresSinIntervalos:
        calculableNoIntervalIndice.indicadoresSinIntervalos,
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editCalculableNoIntervalIndiceModal.name);
  };

  function onSubmit(
    calculableNoIntervalIndiceEdit: CalculableNoIntervalIndiceEdit
  ) {
    editCalculableNoIntervalIndice(calculableNoIntervalIndiceEdit);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <CalculableNoIntervalIndiceForm />
        <FormActionButtons
          submitButtonText="Editar Índice Calculable"
          submitLoading={submitLoading}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
