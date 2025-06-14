import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

interface Props {
  index: number;
}

export default function RHFStackCause({ index }: Props) {
  return (
    <div className="flex items-center">
      <RHFTextField
        name={`causa.${index}.nombre`}
        placeholder="Introduzca el nombre de la causa"
        fullWidth
      />
    </div>
  );
}
