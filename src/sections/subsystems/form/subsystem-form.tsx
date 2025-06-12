import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

export default function SubsystemForm() {
  return (
    <div className="flex flex-col gap-4 p-2">
      <RHFTextField
        name="nombre"
        label="Nombre"
        placeholder="Introduzca nombre del subsistema"
        fullWidth
      />
    </div>
  );
}
