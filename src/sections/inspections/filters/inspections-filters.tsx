"use client";
import React from "react";
import { InspectionsFilters as InspectionsFiltersType } from "./hooks/use-inspections-filters";
import SelectInput from "@/components/inputs/select-input/select-input";
import useConfigs from "@/sections/configs/hooks/use-configs";

interface Props {
  filters: InspectionsFiltersType;
  handleChangeFilters: (filters: Partial<InspectionsFiltersType>) => void;
}

export default function InspectionsFilters({
  filters,
  handleChangeFilters,
}: Props) {
  const { configs, loadingData: loadingDataConfigs } = useConfigs();
  return (
    <div className="flex gap-4">
      <SelectInput
        label="Configuración"
        placeHolder="Seleccione una configuración..."
        value={filters.configId}
        onValueChange={(value) => {
          handleChangeFilters({ configId: value || undefined });
        }}
        options={configs.map((config) => ({
          value: config.version.toString(),
          label: config.nombre,
        }))}
        loading={loadingDataConfigs}
        clearable={{
          handleClear: () => {
            handleChangeFilters({ configId: undefined });
          },
        }}
      />
    </div>
  );
}
