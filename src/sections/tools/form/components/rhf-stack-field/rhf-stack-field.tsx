import { RHFNumberField } from "@/components/form/rhf-components/rhf-number-field/rhf-number-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

interface Props {
  index: number;
}

export default function RHFStackField({ index }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <RHFTextField
        name={`campos.${index}.nombre`}
        label="Nombre"
        placeholder="Introduzca el nombre de la causa"
        fullWidth
      />
      <RHFNumberField
        name={`campos.${index}.nivelImportancia`}
        label="Nivel de Importancia"
        placeholder="Introduzca nivel de importancia"
        fullWidth
      />
    </div>
  );
}
