"use client";

import useUrlFilters from "@/hooks/use-url-filters";
import { convertInspectionsFiltersDTO } from "@/lib/types/inspections";
import { Pagination } from "@/lib/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

export interface InspectionsFilters {
  nombre?: string;
  edificacionId?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
  defaultsFilters?: InspectionsFilters;
  urlPagination?: boolean;
}

export default function useInspectionsFilters({
  setPagination,
  defaultsFilters = {},
  urlPagination = false,
}: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<InspectionsFilters>(defaultsFilters);

  async function handleChangeFilters(
    updatedFilters: Partial<InspectionsFilters>
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
      updateFiltersInUrl(convertInspectionsFiltersDTO(newFilters));
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  function handleResetFilters() {
    setFilters((prev) => ({
      nombre: undefined,
      edificacionId: prev.edificacionId,
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
