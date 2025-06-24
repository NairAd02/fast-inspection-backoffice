"use client";
import React from "react";
import { UsersFilters as UsersFiltersType } from "./hooks/use-users-filters";
import UsersFilters from "./users-filters";
import UsersActiveFilters from "./components/users-active-filters";

interface Props {
  filters: UsersFiltersType;
  handleChangeFilters: (
    updatedFilters: Partial<UsersFiltersType>
  ) => Promise<void>;
  handleResetFilters: () => void;
  getActiveFiltersCount: () => number;
}

export default function UsersFiltersContainer({
  filters,
  handleChangeFilters,
  handleResetFilters,
  getActiveFiltersCount,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <UsersFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
        />
      </div>
      {getActiveFiltersCount() > 0 && (
        <UsersActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
