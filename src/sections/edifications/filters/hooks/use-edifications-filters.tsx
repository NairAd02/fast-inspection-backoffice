"use client";

import useUrlFilters from "@/hooks/use-url-filters";
import { convertEdificationsFiltersDTO } from "@/lib/types/edifications";
import { Pagination } from "@/lib/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

export interface EdificationsFilters {
  nombre?: string;
  direccion?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
  defaultsFilters?: EdificationsFilters;
  urlPagination?: boolean;
}

export default function useEdificationsFilters({
  setPagination,
  defaultsFilters = {},
  urlPagination = false,
}: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<EdificationsFilters>(defaultsFilters);

  async function handleChangeFilters(updatedFilters: Partial<EdificationsFilters>) {
    const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    if (urlPagination) updateFiltersInUrl(convertEdificationsFiltersDTO(newFilters));
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
    if (filters.direccion) count++;

    return count;
  };

  return {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  };
}
