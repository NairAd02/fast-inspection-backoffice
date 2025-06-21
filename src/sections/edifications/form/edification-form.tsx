"use client";
import { RHFMapPicker } from "@/components/form/rhf-components/rhf-map-picker/rhf-map-picker";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

export default function EdificationForm() {
  return (
    <div className="flex flex-col gap-4 p-2">
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
