import React from "react";
import SearchInput from "@/components/inputs/search-input/search-input";
import { EdificationsFilters as EdificationsFiltersType } from "./hooks/use-edifications-filters";

interface Props {
  filters: EdificationsFiltersType;
  handleChangeFilters: (filters: Partial<EdificationsFiltersType>) => void;
}

export default function EdificationsFilters({
  filters,
  handleChangeFilters,
}: Props) {
  return (
    <div className="flex gap-4">
      <SearchInput
        id="nombre"
        placeHolder="Buscar por nombre..."
        value={filters.nombre}
        onChange={(e) => {
          handleChangeFilters({ nombre: e.target.value || undefined });
        }}
      />
      <SearchInput
        id="direccion"
        placeHolder="Buscar por dirección..."
        value={filters.direccion}
        onChange={(e) => {
          handleChangeFilters({ direccion: e.target.value || undefined });
        }}
      />
    </div>
  );
}
