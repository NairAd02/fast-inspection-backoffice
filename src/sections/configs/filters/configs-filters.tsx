import React from "react";
import { ConfigsFilters as ConfigsFiltersType } from "./hooks/use-configs-filters";
import SearchInput from "@/components/inputs/search-input/search-input";

interface Props {
  filters: ConfigsFiltersType;
  handleChangeFilters: (filters: Partial<ConfigsFiltersType>) => void;
}

export default function ConfigsFilters({
  filters,
  handleChangeFilters,
}: Props) {
  return (
    <div className="flex gap-4">
      <SearchInput
        id="version"
        placeHolder="Buscar por versión..."
        value={filters.version}
        type="number"
        onChange={(e) => {
          handleChangeFilters({ version: e.target.value || undefined });
        }}
      />
      <SearchInput
        id="nombre"
        placeHolder="Buscar por nombre..."
        value={filters.nombre}
        onChange={(e) => {
          handleChangeFilters({ nombre: e.target.value || undefined });
        }}
      />
    </div>
  );
}
