"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import { Config } from "@/lib/types/configs";
import useClientPagination from "@/hooks/use-client-pagination";
import { Pagination } from "@/lib/types/pagination";
import useConfigsFilters from "../filters/hooks/use-configs-filters";
import { getConfigsList } from "@/lib/services/configs";

export default function useConfigs() {
  const [configs, setConfigs] = useState<Config[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const {
    pagination: clientPagination,
    setPagination: setClientPagination,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  } = useClientPagination();
  const [pagination, setPagination] = useState<Pagination>(clientPagination);
  const { filters, handleChangeFilters, handleResetFilters } =
    useConfigsFilters({ setPagination: setClientPagination });

  const debouncedFetchRef = useRef(
    debounce(async (filters, clientPagination) => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await getConfigsList({
          pagination: {
            page: clientPagination.page,
            perPage: clientPagination.pageSize,
          },
          search: filters.search,
        });

        if (!res.response || res.error)
          throw new Error("Error al cargar las configuraciones");

        const configs = res.response.data;
        setConfigs(configs);

        setPagination({ ...clientPagination, total: configs.length });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }, 500)
  );

  const fetchConfigs = useCallback(() => {
    debouncedFetchRef.current(filters, clientPagination);
  }, [clientPagination, filters]);

  useEffect(() => {
    fetchConfigs();
  }, [fetchConfigs]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchRef.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  return {
    configs,
    loadingData,
    error,
    pagination,
    filters,
    fetchConfigs,
    clientHandleChangePage,
    clientHandlePageSizeChange,
    handleChangeFilters,
    handleResetFilters,
  };
}
