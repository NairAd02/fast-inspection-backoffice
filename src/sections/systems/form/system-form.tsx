"use client";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import useTools from "@/sections/tools/hooks/use-tools";
import React from "react";

interface Props {
  configVersion: string;
}

export default function SystemForm({ configVersion }: Props) {
  const { tools, loadingData: loadingDataTools } = useTools({
    defaultsFilters: { versionConfig: configVersion },
  });
  return (
    <div className="flex flex-col gap-4 p-2">
      <RHFTextField
        name="nombre"
        label="Nombre"
        placeholder="Introduzca nombre del sistema"
        fullWidth
      />
      <RHFSelectField
        name="herramienta"
        options={tools.map((tool) => ({
          value: tool.id.toString(),
          label: tool.nombre,
        }))}
        loading={loadingDataTools}
        fullWidth
      />
    </div>
  );
}
