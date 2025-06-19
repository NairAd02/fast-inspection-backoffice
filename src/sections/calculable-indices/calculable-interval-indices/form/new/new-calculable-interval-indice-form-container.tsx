"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Crear Índice Calculable
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
