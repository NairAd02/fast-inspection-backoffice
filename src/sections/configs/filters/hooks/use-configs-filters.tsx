"use client";

import useUrlFilters from "@/hooks/use-url-filters";
import { convertConfigsFiltersDTO } from "@/lib/types/configs";
import { Pagination } from "@/lib/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

export interface ConfigsFilters {
  version?: number;
  nombre?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
}

export default function useConfigsFilters({ setPagination }: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<ConfigsFilters>({});

  async function handleChangeFilters(updatedFilters: Partial<ConfigsFilters>) {
    const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    updateFiltersInUrl(convertConfigsFiltersDTO(newFilters));
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  function handleResetFilters() {
    setFilters({});
    updateFiltersInUrl({});
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.version) count++;
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
