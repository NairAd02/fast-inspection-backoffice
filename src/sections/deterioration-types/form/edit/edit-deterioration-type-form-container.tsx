"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
import {
  DefinedFieldTypes,
  SelectionDefinedField,
} from "@/lib/types/defined-fields";
import useEditDeteriorationType from "../../hooks/use-edit-deterioration-type";
import FormActionButtons from "@/components/form/form-action-buttons/form-action-buttons";

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
  const {
    loading: submitLoading,
    editDeteriorationType,
    error,
  } = useEditDeteriorationType({
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
      camposDefinidosSeleccion: deteriorationType.camposDefinidos
        .filter(
          (definedField) => definedField.tipo === DefinedFieldTypes.SELECTION
        )
        .map((definedField) => {
          const selectionDefinedField = definedField as SelectionDefinedField;
          return {
            ...selectionDefinedField,
            opciones: selectionDefinedField.opciones.map((option) => ({
              nombre: option,
            })),
          };
        }),
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
        <DeteriorationTypeForm toolId={toolId} error={error} />
        <FormActionButtons
          submitButtonText="Editar Tipo de Deterioro"
          submitLoading={submitLoading}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
