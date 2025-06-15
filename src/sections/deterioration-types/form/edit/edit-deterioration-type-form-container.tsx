"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import DeteriorationTypeForm from "../deterioration-type-form";
import { DeteriorationTypeDetails } from "@/lib/types/deterioration-type";
import {
  DeteriorationTypeEdit,
  deteriorationTypeEditSchema,
} from "./schemas/deterioration-type-edit-schema";
import { DefinedFieldTypes } from "@/lib/types/defined-fields";
import useEditDeteriorationType from "../../hooks/use-edit-deterioration-type";

interface Props {
  deteriorationType: DeteriorationTypeDetails;
  toolId: string;
}

export default function EditDeteriorationFormContainer({
  deteriorationType,
  toolId,
}: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const { loading: submitLoading, editDeteriorationType } =
    useEditDeteriorationType({
      id: deteriorationType.id.toString(),
      onEditAction: () => {
        toast.success("Tipo de Deterioro editado con éxito");
        handleClose();
        revalidateConfigInformation();
      },
    });
  const form = useForm<DeteriorationTypeEdit>({
    resolver: zodResolver(deteriorationTypeEditSchema),
    defaultValues: {
      nombre: deteriorationType.nombre,
      detectabilidad: deteriorationType.detectabilidad,
      causas: deteriorationType.causas,
      camposAfectados: deteriorationType.camposAfectados.map((field) =>
        field.id.toString()
      ),
      camposDefinidosImagen: deteriorationType.camposDefinidos.filter(
        (definedField) => definedField.tipo === DefinedFieldTypes.IMAGE
      ),
      camposDefinidosNumericos: deteriorationType.camposDefinidos.filter(
        (definedField) => definedField.tipo === DefinedFieldTypes.NUMERIC
      ),
      camposDefinidosSeleccion: deteriorationType.camposDefinidos.filter(
        (definedField) => definedField.tipo === DefinedFieldTypes.SELECTION
      ),
      camposDefinidosTexto: deteriorationType.camposDefinidos.filter(
        (definedField) => definedField.tipo === DefinedFieldTypes.TEXT
      ),
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editDeteriorationTypeModal.name);
  };

  function onSubmit(deteriorationTypeEdit: DeteriorationTypeEdit) {
    editDeteriorationType(deteriorationTypeEdit);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <DeteriorationTypeForm toolId={toolId} />
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
