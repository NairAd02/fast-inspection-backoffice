"use client";
import { RHFListField } from "@/components/form/rhf-components/rhf-list-field/rhf-list-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";
import { FieldCreate } from "./new/schemas/field-create-schema";
import RHFStackField from "./components/rhf-stack-field/rhf-stack-field";

export default function ToolForm() {
  return (
    <div className="flex flex-col gap-4 p-2">
      <RHFTextField
        name="nombre"
        label="Nombre"
        placeholder="Introduzca nombre de la herramienta"
        fullWidth
      />
      <RHFListField<FieldCreate>
        name="campos"
        newItem={{ nombre: "", nivelImportancia: 1 }}
        StackComponent={RHFStackField}
        label="Campos"
        emptyText="No se han creado campos todavía"
        className="max-h-[36vh] p-2"
      />
    </div>
  );
}
