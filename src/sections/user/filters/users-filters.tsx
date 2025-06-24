import React from "react";
import SearchInput from "@/components/inputs/search-input/search-input";
import { UsersFilters as UsersFiltersType } from "./hooks/use-users-filters";
import SelectInput from "@/components/inputs/select-input/select-input";
import { Role } from "@/lib/types/user";

interface Props {
  filters: UsersFiltersType;
  handleChangeFilters: (filters: Partial<UsersFiltersType>) => void;
}

export default function UsersFilters({ filters, handleChangeFilters }: Props) {
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

      <SelectInput
        label="Rol"
        placeHolder="Seleccione un rol..."
        value={filters.rol}
        onValueChange={(value) => {
          handleChangeFilters({ rol: (value as Role) || undefined });
        }}
        options={Role.map((role) => ({
          value: role,
          label: role,
        }))}
        clearable={{
          handleClear: () => {
            handleChangeFilters({ rol: undefined });
          },
        }}
      />
    </div>
  );
}
