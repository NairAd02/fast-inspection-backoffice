"use client";
import { RHFListField } from "@/components/form/rhf-components/rhf-list-field/rhf-list-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { Calculos, calculosMap } from "@/lib/types/calculable-indices";
import { IndicatorNoIntervalCreate } from "./new/schemas/indicator-no-interval-create-schema";
import RHFStackIndicatorNoInterval from "./components/rhf-stack-indicator-no-interval/rhf-stack-indicator-no-interval";
import { AlertDestructive } from "@/components/ui/alert-destructive";

interface Props {
  error?: string | null;
}

export default function CalculableNoIntervalIndiceForm({ error }: Props) {
  return (
    <div className="flex flex-col gap-4 p-2">
      {error && <AlertDestructive title={error} />}
      <RHFTextField
        name="nombre"
        label="Nombre"
        placeholder="Introduzca nombre del índice calculable"
        fullWidth
      />
      <RHFSelectField
        name="calculo"
        label="Cálculo"
        options={[
          {
            value: Calculos.Criticidad,
            label: calculosMap.get(Calculos.Criticidad)?.name as string,
          },
          {
            value: Calculos.Detectabilidad,
            label: calculosMap.get(Calculos.Detectabilidad)?.name as string,
          },
          {
            value: Calculos.Frecuencia,
            label: calculosMap.get(Calculos.Frecuencia)?.name as string,
          },
          {
            value: Calculos.Impacto,
            label: calculosMap.get(Calculos.Impacto)?.name as string,
          },
        ]}
      />
      <RHFListField<IndicatorNoIntervalCreate>
        name="indicadoresSinIntervalos"
        newItem={{ nombre: "", valor: 1 }}
        StackComponent={RHFStackIndicatorNoInterval}
        label="Indicadores"
        emptyText="No se han creado indicadores todavía"
        className="max-h-[36vh] p-2"
      />
    </div>
  );
}
