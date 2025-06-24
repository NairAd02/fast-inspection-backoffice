"use client";

import useUrlFilters from "@/hooks/use-url-filters";
import { Pagination } from "@/lib/types/pagination";
import { convertToolsFiltersDTO } from "@/lib/types/tools";
import { Role } from "@/lib/types/user";
import { Dispatch, SetStateAction, useState } from "react";

export interface UsersFilters {
  nombre?: string;
  rol?: Role;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
  defaultsFilters?: UsersFilters;
  urlPagination?: boolean;
}

export default function useUsersFilters({
  setPagination,
  defaultsFilters = {},
  urlPagination = false,
}: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<UsersFilters>(defaultsFilters);

  async function handleChangeFilters(updatedFilters: Partial<UsersFilters>) {
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
    setFilters({
      nombre: undefined,
      rol: undefined,
    });
    if (urlPagination) updateFiltersInUrl({});
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.nombre) count++;
    if (filters.rol) count++;
    return count;
  };

  return {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  };
}
