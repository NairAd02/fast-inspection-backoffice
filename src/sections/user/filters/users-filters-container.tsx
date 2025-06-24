"use client";
import React from "react";
import UsersFilters from "./users-filters";
import UsersActiveFilters from "./components/users-active-filters";
import useUsersFilters from "./hooks/use-users-filters";

export default function UsersFiltersContainer() {
  const {
    filters,
    getActiveFiltersCount,
    handleChangeFilters,
    handleResetFilters,
  } = useUsersFilters({ urlPagination: true });
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
