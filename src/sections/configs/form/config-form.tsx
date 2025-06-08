"use client";
import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

export default function ConfigForm() {
  return (
    <div className="flex flex-col gap-4 p-2">
      <RHFTextField
        name="nombre"
        label="Nombre"
        placeholder="Introduzca nombre de la configuración"
        fullWidth
      />
      <RHFTextAreaField
        name="descripcion"
        label="Descripción"
        placeholder="Introduzca descripción de la configuración"
        fullWidth
      />
    </div>
  );
}
