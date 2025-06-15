"use client";

import useUrlFilters from "@/hooks/use-url-filters";
import { Pagination } from "@/lib/types/pagination";
import { convertToolsFiltersDTO } from "@/lib/types/tools";
import { Dispatch, SetStateAction, useState } from "react";

export interface ToolsFilters {
  nombre?: string;
  versionConfig?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
  defaultsFilters?: ToolsFilters;
  urlPagination?: boolean;
}

export default function useToolsFilters({
  setPagination,
  defaultsFilters = {},
  urlPagination = false,
}: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<ToolsFilters>(defaultsFilters);

  async function handleChangeFilters(updatedFilters: Partial<ToolsFilters>) {
    const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    if (urlPagination) updateFiltersInUrl(convertToolsFiltersDTO(newFilters));
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  function handleResetFilters() {
    setFilters({});
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
