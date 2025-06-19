"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import { CalculableIntervalIndiceDetails } from "@/lib/types/calculable-interval-indices";
import useEditCalculableIntervalIndice from "../../hooks/use-edit-calculable-interval-indice";
import {
  CalculableIntervalIndiceEdit,
  calculableIntervalIndiceEditSchema,
} from "./schemas/calculable-interval-indice-edit-schema";
import CalculableIntervalIndiceForm from "../calculable-interval-indice-form";

interface Props {
  calculableIntervalIndice: CalculableIntervalIndiceDetails;
  fetchCalculableIntervalIndices: () => Promise<void>;
}

export default function EditCalculableIntervalIndiceFormContainer({
  calculableIntervalIndice,
  fetchCalculableIntervalIndices,
}: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const { loading: submitLoading, editCalculableIntervalIndice } =
    useEditCalculableIntervalIndice({
      id: calculableIntervalIndice.id.toString(),
      onEditAction: () => {
        toast.success("Índice Calculable editado con éxito");
        handleClose();
        fetchCalculableIntervalIndices();
        revalidateConfigInformation();
      },
    });
  const form = useForm<CalculableIntervalIndiceEdit>({
    resolver: zodResolver(calculableIntervalIndiceEditSchema),
    defaultValues: {
      nombre: calculableIntervalIndice.nombre,
      calculo: calculableIntervalIndice.calculo,
      indicadoresIntervalos: calculableIntervalIndice.indicadoresIntervalos,
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editCalculableIntervalIndiceModal.name);
  };

  function onSubmit(
    calculableIntervalIndiceEdit: CalculableIntervalIndiceEdit
  ) {
    editCalculableIntervalIndice(calculableIntervalIndiceEdit);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <CalculableIntervalIndiceForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Editar Índice Calculable
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
