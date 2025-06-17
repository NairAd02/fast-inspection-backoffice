import React from "react";
import SearchInput from "@/components/inputs/search-input/search-input";
import { CalculableNoIntervalIndicesFilters as CalculableNoIntervalIndicesFiltersType } from "./hooks/use-calculable-no-interval-indices-filters";

interface Props {
  filters: CalculableNoIntervalIndicesFiltersType;
  handleChangeFilters: (
    filters: Partial<CalculableNoIntervalIndicesFiltersType>
  ) => void;
}

export default function CalculableNoIntervalIndicesFilters({
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
