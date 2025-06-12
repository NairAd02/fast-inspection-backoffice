"use client";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";
import SystemToolsField from "./system-tools-field";

interface Props {
  configVersion?: string;
  editMode?: boolean;
}

export default function SystemForm({ configVersion, editMode = false }: Props) {
  return (
    <div className="flex flex-col gap-4 p-2">
      <RHFTextField
        name="nombre"
        label="Nombre"
        placeholder="Introduzca nombre del sistema"
        fullWidth
      />
      {!editMode && configVersion && (
        <SystemToolsField configVersion={configVersion} />
      )}
    </div>
  );
}
