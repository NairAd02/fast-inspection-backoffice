"use client";
import { RHFListField } from "@/components/form/rhf-components/rhf-list-field/rhf-list-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { Calculos, calculosMap } from "@/lib/types/calculable-indices";
import { IndicatorIntervalCreate } from "./new/schemas/indicator-interval-create-schema";
import RHFStackIndicatorInterval from "./components/rhf-stack-indicator-interval/rhf-stack-indicator-interval";
import { useFormContext } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function CalculableIntervalIndiceForm() {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-4 p-2">
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

      {/* Mostrar error de indicadoresIntervalos si existe */}
      {errors.indicadoresIntervalos?.root && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            {errors.indicadoresIntervalos.root.message as string}
          </AlertDescription>
        </Alert>
      )}

      <RHFListField<IndicatorIntervalCreate>
        name="indicadoresIntervalos"
        newItem={{ nombre: "", valor: 1, limiteInferior: 1, limiteSuperior: 1 }}
        StackComponent={RHFStackIndicatorInterval}
        label="Indicadores"
        emptyText="No se han creado indicadores todavía"
        className="max-h-[36vh] p-2"
      />
    </div>
  );
}
