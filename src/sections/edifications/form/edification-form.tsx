"use client";
import { RHFMapPicker } from "@/components/form/rhf-components/rhf-map-picker/rhf-map-picker";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import React from "react";

interface Props {
  error?: string | null;
}

export default function EdificationForm({ error }: Props) {
  return (
    <div className="flex flex-col gap-4 p-2">
      {error && <AlertDestructive title={error} />}
      <RHFTextField
        name="nombre"
        label="Nombre"
        placeholder="Introduzca nombre de la edificación"
        fullWidth
      />
      <RHFTextField
        name="direccion"
        label="Dirección"
        placeholder="Introduzca dirección de la edificación"
        fullWidth
      />
      <RHFMapPicker
        name="position"
        label="Ubicación en el mapa"
        description="Haz clic en el mapa para seleccionar la ubicación"
        fullWidth
      />
    </div>
  );
}
