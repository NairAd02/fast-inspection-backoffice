"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import useClientPagination from "@/hooks/use-client-pagination";
import { Pagination } from "@/lib/types/pagination";
import useCalculableIntervalIndicesFilters, {
  CalculableIntervalIndicesFilters,
} from "../filters/hooks/use-calculable-interval-indices-filters";
import { CalculableIntervalIndice } from "@/lib/types/calculable-interval-indices";
import { getCalculableIntervalIndicesList } from "@/lib/services/calculable-interval-indices";

interface Props {
  defaultsFilters?: CalculableIntervalIndicesFilters;
}

export default function useCalculableIntervalIndices({
  defaultsFilters,
}: Props) {
  const [calculableIntervalIndices, setCalculableIntervalIndices] = useState<
    CalculableIntervalIndice[]
  >([]);
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
  } = useCalculableIntervalIndicesFilters({
    setPagination: setClientPagination,
    defaultsFilters,
  });

  const debouncedFetchRef = useRef(
    debounce(async (filters, clientPagination) => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await getCalculableIntervalIndicesList({
          pagination: {
            page: clientPagination.page,
            perPage: clientPagination.pageSize,
          },
          versionConfig: filters.versionConfig,
          nombre: filters.nombre,
        });

        if (!res.response || res.error)
          throw new Error("Error al cargar los indices calculables");

        const calculableIntervalIndices = res.response.data;
        setCalculableIntervalIndices(calculableIntervalIndices);

        setPagination({
          ...clientPagination,
          total: calculableIntervalIndices.length,
        });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }, 500)
  );

  const fetchCalculableIntervalIndices = useCallback(() => {
    debouncedFetchRef.current(filters, clientPagination);
  }, [clientPagination, filters]);

  useEffect(() => {
    fetchCalculableIntervalIndices();
  }, [fetchCalculableIntervalIndices]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchRef.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  return {
    calculableIntervalIndices,
    loadingData,
    error,
    pagination,
    filters: {
      filters: filters,
      handleChangeFilters,
      handleResetFilters,
      getActiveFiltersCount,
    },
    fetchCalculableIntervalIndices,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  };
}
