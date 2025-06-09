import { Label } from "@/components/ui/label";
import React from "react";
import { ConfigsFilters } from "../hooks/use-configs-filters";
import FilterBadge from "@/components/filters/filter-badge/filter-badge";

interface Props {
  filters: ConfigsFilters;
  handleChangeFilters: (filters: Partial<ConfigsFilters>) => void;
}

export default function ConfigsActiveFilters({
  filters,
  handleChangeFilters,
}: Props) {
  return (
    <div>
      <div className="space-y-4">
        <Label>Filtros Activos</Label>
        <div className="flex flex-wrap gap-2">
          {filters.version && (
            <FilterBadge
              filterName="Versión"
              filterValue={filters.version}
              handleDeleteFilter={() => {
                handleChangeFilters({ version: undefined });
              }}
            />
          )}
          {filters.nombre && (
            <FilterBadge
              filterName="Nombre"
              filterValue={filters.nombre}
              handleDeleteFilter={() => {
                handleChangeFilters({ nombre: undefined });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
