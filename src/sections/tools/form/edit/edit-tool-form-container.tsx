"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { toast } from "react-toastify";
import { RevalidateConfigInformationContext } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import ToolForm from "../tool-form";
import { ToolEdit, toolEditSchema } from "./schemas/tool-edit-schema";
import { ToolDetails } from "@/lib/types/tools";
import useEditTool from "../../hooks/use-edit-tool";

interface Props {
  tool: ToolDetails;
  fetchTools: () => Promise<void>;
}

export default function EditToolFormContainer({ tool, fetchTools }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { revalidateConfigInformation } = useContext(
    RevalidateConfigInformationContext
  );
  const { loading: submitLoading, editTool } = useEditTool({
    id: tool.id.toString(),
    onEditAction: () => {
      toast.success("Herramienta editada con éxito");
      handleClose();
      fetchTools();
      revalidateConfigInformation();
    },
  });
  const form = useForm<ToolEdit>({
    resolver: zodResolver(toolEditSchema),
    defaultValues: {
      nombre: tool.nombre,
      campos: tool.campos,
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editToolModal.name);
  };

  function onSubmit(toolEdit: ToolEdit) {
    editTool(toolEdit);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <ToolForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Editar Herramienta
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
