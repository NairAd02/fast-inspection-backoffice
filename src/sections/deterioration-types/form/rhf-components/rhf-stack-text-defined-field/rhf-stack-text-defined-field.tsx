import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { TypeIcon } from "lucide-react";
import React from "react";

interface Props {
  index: number;
}

export default function RHFStackTextDefinedField({ index }: Props) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <TypeIcon className="h-4 w-4 text-blue-500" />
          <span className="font-medium">Campo de Texto</span>
        </div>
      </div>
      <RHFTextField
        name={`camposDefinidosTexto.${index}.nombre`}
        label="Nombre del Campo Definido"
        placeholder="Introduzca el nombre del campo definido"
        fullWidth
      />
    </div>
  );
}
