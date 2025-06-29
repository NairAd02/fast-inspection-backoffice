"use client";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";
import useConfigs from "../hooks/use-configs";
import { ConfigDetails } from "@/lib/types/configs";
import ReplicateConfigSectionForm from "./replicate/replicate-config-section-form/replicate-config-section-form";
import { AlertDestructive } from "@/components/ui/alert-destructive";

interface Props {
  editMode?: boolean;
  replicateConfig?: ConfigDetails;
  error?: string | null;
}

export default function ConfigForm({
  editMode = false,
  replicateConfig,
  error,
}: Props) {
  const { configs, loadingData: loadingDataConfigs } = useConfigs();

  return (
    <div className="flex flex-col gap-4 p-2">
      {error && <AlertDestructive title={error} />}
      <RHFTextField
        name="nombre"
        label="Nombre"
        placeholder="Introduzca nombre de la configuración"
        fullWidth
      />
      <RHFTextAreaField
        name="descripcion"
        label="Descripción"
        placeholder="Introduzca descripción de la configuración"
        fullWidth
      />

      {!editMode && !replicateConfig && (
        <RHFSelectField
          name="configReplicate"
          label="Configuración a Replicar"
          placeholder="Seleccione, si lo desea, una configuración a replicar"
          options={configs.map((config) => ({
            value: config.version.toString(),
            label: config.nombre,
          }))}
          loading={loadingDataConfigs}
          clearable
        />
      )}

      {replicateConfig && (
        <ReplicateConfigSectionForm replicateConfig={replicateConfig} />
      )}
    </div>
  );
}
