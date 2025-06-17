"use client";

import useUrlFilters from "@/hooks/use-url-filters";
import { convertCalculableNoIntervalIndiceFiltersDTO } from "@/lib/types/calculable-no-interval-indices";
import { Pagination } from "@/lib/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

export interface CalculableNoIntervalIndicesFilters {
  nombre?: string;
  versionConfig?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
  defaultsFilters?: CalculableNoIntervalIndicesFilters;
  urlPagination?: boolean;
}

export default function useCalculableNoIntervalIndicesFilters({
  setPagination,
  defaultsFilters = {},
  urlPagination = false,
}: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] =
    useState<CalculableNoIntervalIndicesFilters>(defaultsFilters);

  async function handleChangeFilters(
    updatedFilters: Partial<CalculableNoIntervalIndicesFilters>
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
      updateFiltersInUrl(
        convertCalculableNoIntervalIndiceFiltersDTO(newFilters)
      );
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
