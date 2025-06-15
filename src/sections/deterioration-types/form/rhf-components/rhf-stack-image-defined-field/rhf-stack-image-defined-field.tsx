import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { ImageIcon } from "lucide-react";
import React from "react";

interface Props {
  index: number;
}

export default function RHFStackImageDefinedField({ index }: Props) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <ImageIcon className="h-4 w-4 text-orange-500" />
          <span className="font-medium">Campo de Imagen</span>
        </div>
      </div>
      <div className="space-y-2">
        <RHFTextField
          name={`camposDefinidosImagen.${index}.nombre`}
          label="Nombre del Campo Definido"
          placeholder="Introduzca el nombre del campo definido"
          fullWidth
        />
      </div>
    </div>
  );
}
