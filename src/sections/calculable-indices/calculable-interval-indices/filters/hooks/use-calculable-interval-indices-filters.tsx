"use client";

import useUrlFilters from "@/hooks/use-url-filters";
import { convertCalculableIntervalIndiceFiltersDTO } from "@/lib/types/calculable-interval-indices";
import { Pagination } from "@/lib/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

export interface CalculableIntervalIndicesFilters {
  nombre?: string;
  versionConfig?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
  defaultsFilters?: CalculableIntervalIndicesFilters;
  urlPagination?: boolean;
}

export default function useCalculableIntervalIndicesFilters({
  setPagination,
  defaultsFilters = {},
  urlPagination = false,
}: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] =
    useState<CalculableIntervalIndicesFilters>(defaultsFilters);

  async function handleChangeFilters(
    updatedFilters: Partial<CalculableIntervalIndicesFilters>
  ) {
    const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    if (urlPagination)
      updateFiltersInUrl(convertCalculableIntervalIndiceFiltersDTO(newFilters));
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  function handleResetFilters() {
    setFilters((prev) => ({
      nombre: undefined,
      versionConfig: prev.versionConfig,
    }));
    if (urlPagination) updateFiltersInUrl({});
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.nombre) count++;

    return count;
  };

  return {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  };
}
