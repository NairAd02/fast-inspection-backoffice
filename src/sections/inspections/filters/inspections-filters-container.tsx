"use client";
import React from "react";
import { InspectionsFilters as InspectionsFiltersType } from "./hooks/use-inspections-filters";
import InspectionsFilters from "./inspections-filters";
import InspectionsActiveFilters from "./components/inspections-active-filters/inspections-active-filters";

interface Props {
  filters: InspectionsFiltersType;
  handleChangeFilters: (
    updatedFilters: Partial<InspectionsFiltersType>
  ) => Promise<void>;
  handleResetFilters: () => void;
  getActiveFiltersCount: () => number;
}

export default function InspectionsFiltersContainer({
  filters,
  handleChangeFilters,
  handleResetFilters,
  getActiveFiltersCount,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <InspectionsFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
        />
      </div>
      {getActiveFiltersCount() > 0 && (
        <InspectionsActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
