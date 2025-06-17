"use client";
import React from "react";
import { CalculableNoIntervalIndicesFilters as CalculableNoIntervalIndicesFiltersType } from "./hooks/use-calculable-no-interval-indices-filters";
import CalculableNoIntervalIndicesFilters from "./calculable-no-interval-indices-filters";
import CalculableNoIntervalIndicesActiveFilters from "./calculable-no-interval-indices-active-filters/calculable-no-interval-indices-active-filters";

interface Props {
  filters: CalculableNoIntervalIndicesFiltersType;
  handleChangeFilters: (
    updatedFilters: Partial<CalculableNoIntervalIndicesFiltersType>
  ) => Promise<void>;
  handleResetFilters: () => void;
  getActiveFiltersCount: () => number;
}

export default function CalculableNoIntervalIndicesFiltersContainer({
  filters,
  handleChangeFilters,
  handleResetFilters,
  getActiveFiltersCount,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <CalculableNoIntervalIndicesFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
        />
      </div>
      {getActiveFiltersCount() > 0 && (
        <CalculableNoIntervalIndicesActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
