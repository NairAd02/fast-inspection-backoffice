import { Label } from "@/components/ui/label";
import React from "react";
import FilterBadge from "@/components/filters/filter-badge/filter-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcwIcon } from "lucide-react";
import { UsersFilters } from "../hooks/use-users-filters";

interface Props {
  filters: UsersFilters;
  handleChangeFilters: (filters: Partial<UsersFilters>) => void;
  getActiveFiltersCount: () => number;
  handleResetFilters: () => void;
}

export default function UsersActiveFilters({
  filters,
  handleChangeFilters,
  getActiveFiltersCount,
  handleResetFilters,
}: Props) {
  return (
    <div>
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <Label>Filtros Activos</Label>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getActiveFiltersCount()}
            </Badge>
          )}
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="h-8"
            >
              <RotateCcwIcon className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.nombre && (
            <FilterBadge
              filterName="Nombre"
              filterValue={filters.nombre}
              handleDeleteFilter={() => {
                handleChangeFilters({ nombre: undefined });
              }}
            />
          )}
          {filters.rol && (
            <FilterBadge
              filterName="Rol"
              filterValue={filters.rol}
              handleDeleteFilter={() => {
                handleChangeFilters({ rol: undefined });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
