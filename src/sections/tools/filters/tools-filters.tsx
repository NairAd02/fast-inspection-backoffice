import React from "react";
import SearchInput from "@/components/inputs/search-input/search-input";
import { ToolsFilters as ToolsFiltersType } from "./hooks/use-tools-filters";

interface Props {
  filters: ToolsFiltersType;
  handleChangeFilters: (filters: Partial<ToolsFiltersType>) => void;
}

export default function ToolsFilters({ filters, handleChangeFilters }: Props) {
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
