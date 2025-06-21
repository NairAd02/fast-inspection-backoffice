"use client";
import React from "react";
import useEdificationsFilters from "./hooks/use-edifications-filters";
import EdificationsFilters from "./edifications-filters";
import EdificationsActiveFilters from "./components/edifications-active-filters/edifications-active-filters";

export default function EdificationsFiltersContainer() {
  const {
    filters,
    getActiveFiltersCount,
    handleChangeFilters,
    handleResetFilters,
  } = useEdificationsFilters({ urlPagination: true });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <EdificationsFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
        />
      </div>
      {getActiveFiltersCount() > 0 && (
        <EdificationsActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
