"use client";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";
import SystemToolsField from "./system-tools-field";
import { AlertDestructive } from "@/components/ui/alert-destructive";

interface Props {
  configVersion?: string;
  editMode?: boolean;
  error?: string | null;
}

export default function SystemForm({
  configVersion,
  editMode = false,
  error,
}: Props) {
  return (
    <div className="flex flex-col gap-4 p-2">
      {error && <AlertDestructive title={error} />}
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
