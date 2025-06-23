import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import React from "react";

interface Props {
  error?: string | null;
}

export default function MaterialForm({ error }: Props) {
  return (
    <div className="flex flex-col gap-4 p-2">
      {error && <AlertDestructive title={error} />}
      <RHFTextField
        name="nombre"
        label="Nombre"
        placeholder="Introduzca nombre del material"
        fullWidth
      />
    </div>
  );
}
