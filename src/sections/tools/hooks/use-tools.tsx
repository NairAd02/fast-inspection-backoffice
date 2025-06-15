"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import useClientPagination from "@/hooks/use-client-pagination";
import { Pagination } from "@/lib/types/pagination";
import useToolsFilters, {
  ToolsFilters,
} from "../filters/hooks/use-tools-filters";
import { getToolsList } from "@/lib/services/tools";
import { Tool } from "@/lib/types/tools";

interface Props {
  defaultsFilters?: ToolsFilters;
}

export default function useTools({ defaultsFilters }: Props) {
  const [tools, setTools] = useState<Tool[]>([]);
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
  } = useToolsFilters({
    setPagination: setClientPagination,
    defaultsFilters,
  });

  const debouncedFetchRef = useRef(
    debounce(async (filters, clientPagination) => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await getToolsList({
          pagination: {
            page: clientPagination.page,
            perPage: clientPagination.pageSize,
          },
          versionConfig: filters.versionConfig,
        });

        if (!res.response || res.error)
          throw new Error("Error al cargar las herramientas");

        const tools = res.response.data;
        setTools(tools);

        setPagination({ ...clientPagination, total: tools.length });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }, 500)
  );

  const fetchTools = useCallback(() => {
    debouncedFetchRef.current(filters, clientPagination);
  }, [clientPagination, filters]);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchRef.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  return {
    tools,
    loadingData,
    error,
    pagination,
    filters: {
      filters: filters,
      handleChangeFilters,
      handleResetFilters,
      getActiveFiltersCount,
    },
    fetchTools,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  };
}
