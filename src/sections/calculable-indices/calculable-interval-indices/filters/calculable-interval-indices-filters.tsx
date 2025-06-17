import React from "react";
import SearchInput from "@/components/inputs/search-input/search-input";
import { CalculableIntervalIndicesFilters as CalculableIntervalIndicesFiltersType } from "./hooks/use-calculable-interval-indices-filters";

interface Props {
  filters: CalculableIntervalIndicesFiltersType;
  handleChangeFilters: (
    filters: Partial<CalculableIntervalIndicesFiltersType>
  ) => void;
}

export default function CalculableIntervalIndicesFilters({
  filters,
  handleChangeFilters,
}: Props) {
  return (
    <div className="flex gap-4">
      <SearchInput
        id="nombre"
        placeHolder="Buscar por nombre..."
        value={filters.nombre}
        type="text"
        onChange={(e) => {
          handleChangeFilters({ nombre: e.target.value || undefined });
        }}
      />
    </div>
  );
}
