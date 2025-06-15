import { RHFNumberField } from "@/components/form/rhf-components/rhf-number-field/rhf-number-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { HashIcon } from "lucide-react";
import React from "react";

interface Props {
  index: number;
}

export default function RHFStackNumericDefinedField({ index }: Props) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <HashIcon className="h-4 w-4 text-green-500" />
          <span className="font-medium">Campo Numérico</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <RHFTextField
          name={`camposDefinidosNumericos.${index}.nombre`}
          label="Nombre del Campo Definido"
          placeholder="Introduzca el nombre del campo definido"
          fullWidth
        />
        <RHFTextField
          name={`camposDefinidosNumericos.${index}.unidadMedida`}
          label="Unidad de Medida"
          placeholder="ej: kg, cm, %"
          fullWidth
        />
        <RHFNumberField
          name={`camposDefinidosNumericos.${index}.inicioIntervalo`}
          label="Inicio del Intervalo"
          fullWidth
        />
        <RHFNumberField
          name={`camposDefinidosNumericos.${index}.finalIntervalo`}
          label="Final del Intervalo"
          fullWidth
        />
      </div>
    </div>
  );
}
