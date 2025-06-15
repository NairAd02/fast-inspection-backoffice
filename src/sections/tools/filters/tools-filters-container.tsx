"use client";
import React from "react";
import ToolsActiveFilters from "./tools-active-filters/tools-active-filters";
import { ToolsFilters as ToolsFiltersType } from "./hooks/use-tools-filters";
import ToolsFilters from "./tools-filters";

interface Props {
  filters: ToolsFiltersType;
  handleChangeFilters: (
    updatedFilters: Partial<ToolsFiltersType>
  ) => Promise<void>;
  handleResetFilters: () => void;
  getActiveFiltersCount: () => number;
}

export default function ToolsFiltersContainer({
  filters,
  handleChangeFilters,
  handleResetFilters,
  getActiveFiltersCount,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <ToolsFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
        />
      </div>
      {getActiveFiltersCount() > 0 && (
        <ToolsActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
