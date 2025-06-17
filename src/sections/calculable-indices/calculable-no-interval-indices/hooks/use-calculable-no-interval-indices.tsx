"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import useClientPagination from "@/hooks/use-client-pagination";
import { Pagination } from "@/lib/types/pagination";
import useCalculableNoIntervalIndicesFilters, {
  CalculableNoIntervalIndicesFilters,
} from "../filters/hooks/use-calculable-no-interval-indices-filters";
import { CalculableNoIntervalIndice } from "@/lib/types/calculable-no-interval-indices";
import { getCalculableNoIntervalIndicesList } from "@/lib/services/calculable-no-interval-indices";

interface Props {
  defaultsFilters?: CalculableNoIntervalIndicesFilters;
}

export default function useCalculableNoIntervalIndices({
  defaultsFilters,
}: Props) {
  const [calculableNoIntervalIndices, setCalculableNoIntervalIndices] =
    useState<CalculableNoIntervalIndice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const {
    pagination: clientPagination,
    setPagination: setClientPagination,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  } = useClientPagination();
  const [pagination, setPagination] = useState<Pagination>(clientPagination);
  const {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  } = useCalculableNoIntervalIndicesFilters({
    setPagination: setClientPagination,
    defaultsFilters,
  });

  const debouncedFetchRef = useRef(
    debounce(async (filters, clientPagination) => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await getCalculableNoIntervalIndicesList({
          pagination: {
            page: clientPagination.page,
            perPage: clientPagination.pageSize,
          },
          versionConfig: filters.versionConfig,
          nombre: filters.nombre,
        });

        if (!res.response || res.error)
          throw new Error("Error al cargar los indices calculables");

        const calculableNoIntervalIndices = res.response.data;
        setCalculableNoIntervalIndices(calculableNoIntervalIndices);

        setPagination({
          ...clientPagination,
          total: calculableNoIntervalIndices.length,
        });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }, 500)
  );

  const fetchCalculableNoIntervalIndices = useCallback(() => {
    debouncedFetchRef.current(filters, clientPagination);
  }, [clientPagination, filters]);

  useEffect(() => {
    fetchCalculableNoIntervalIndices();
  }, [fetchCalculableNoIntervalIndices]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchRef.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  return {
    calculableNoIntervalIndices,
    loadingData,
    error,
    pagination,
    filters: {
      filters: filters,
      handleChangeFilters,
      handleResetFilters,
      getActiveFiltersCount,
    },
    fetchCalculableNoIntervalIndices,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  };
}
