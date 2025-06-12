"use client";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import useTools from "@/sections/tools/hooks/use-tools";
import React from "react";

interface Props {
  configVersion: string;
}

export default function SystemToolsField({ configVersion }: Props) {
  const { tools, loadingData: loadingDataTools } = useTools({
    defaultsFilters: { versionConfig: configVersion },
  });
  return (
    <RHFSelectField
      name="herramienta"
      options={tools.map((tool) => ({
        value: tool.id.toString(),
        label: tool.nombre,
      }))}
      loading={loadingDataTools}
      fullWidth
    />
  );
}
