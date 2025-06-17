"use client";
import React from "react";
import { CalculableIntervalIndicesFilters as CalculableIntervalIndicesFiltersType } from "./hooks/use-calculable-interval-indices-filters";
import CalculableIntervalIndicesFilters from "./calculable-interval-indices-filters";
import CalculableIntervalIndicesActiveFilters from "./calculable-interval-indices-active-filters/calculable-interval-indices-active-filters";

interface Props {
  filters: CalculableIntervalIndicesFiltersType;
  handleChangeFilters: (
    updatedFilters: Partial<CalculableIntervalIndicesFiltersType>
  ) => Promise<void>;
  handleResetFilters: () => void;
  getActiveFiltersCount: () => number;
}

export default function CalculableIntervalIndicesFiltersContainer({
  filters,
  handleChangeFilters,
  handleResetFilters,
  getActiveFiltersCount,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <CalculableIntervalIndicesFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
        />
      </div>
      {getActiveFiltersCount() > 0 && (
        <CalculableIntervalIndicesActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
