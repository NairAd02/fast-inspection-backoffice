import { RHFNumberField } from "@/components/form/rhf-components/rhf-number-field/rhf-number-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

interface Props {
  index: number;
}

export default function RHFStackIndicatorInterval({ index }: Props) {
  return (
    <div className="flex gap-4 w-full items-center">
      <div className="flex w-full flex-col gap-2">
        <RHFTextField
          name={`indicadoresIntervalos.${index}.nombre`}
          label="Nombre"
          placeholder="Introduzca el nombre del indicador"
          fullWidth
        />
        <RHFNumberField
          name={`indicadoresIntervalos.${index}.valor`}
          label="Valor"
          placeholder="Introduzca el valor del indicador"
          fullWidth
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <RHFNumberField
          name={`indicadoresIntervalos.${index}.limiteInferior`}
          label="Límite Inferior"
          placeholder="Introduzca el límite inferior del indicador"
          fullWidth
        />
        <RHFNumberField
          name={`indicadoresIntervalos.${index}.limiteSuperior`}
          label="Límite Superior"
          placeholder="Introduzca el límite superior del indicador"
          fullWidth
        />
      </div>
    </div>
  );
}
