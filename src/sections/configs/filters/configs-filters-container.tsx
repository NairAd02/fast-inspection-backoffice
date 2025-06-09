"use client";
import React from "react";
import useConfigsFilters from "./hooks/use-configs-filters";
import ConfigsFilters from "./configs-filters";
import ConfigsActiveFilters from "./configs-active-filters/configs-active-filters";


export default function ConfigsFiltersContainer() {
  const {
    filters,
    getActiveFiltersCount,
    handleChangeFilters,
    handleResetFilters,
  } = useConfigsFilters({});
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <ConfigsFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
        />
      </div>
      {getActiveFiltersCount() > 0 && (
        <ConfigsActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
