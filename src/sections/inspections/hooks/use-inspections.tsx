"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import useClientPagination from "@/hooks/use-client-pagination";
import { Pagination } from "@/lib/types/pagination";
import useInspectionsFilters, {
  InspectionsFilters,
} from "../filters/hooks/use-inspections-filters";
import { Inspection } from "@/lib/types/inspections";
import { getInspectionsList } from "@/lib/services/inspections";

interface Props {
  defaultsFilters?: InspectionsFilters;
}

export default function useInspections({ defaultsFilters }: Props) {
  const [inspections, setInspections] = useState<Inspection[]>([]);
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
  } = useInspectionsFilters({
    setPagination: setClientPagination,
    defaultsFilters,
  });

  const debouncedFetchRef = useRef(
    debounce(async (filters, clientPagination) => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await getInspectionsList({
          pagination: {
            page: clientPagination.page,
            perPage: clientPagination.pageSize,
          },
          edificacionId: filters.edificacionId,
          configId: filters.configId,
        });

        if (!res.response || res.error)
          throw new Error("Error al cargar las inspecciones");

        const inspections = res.response.data;
        setInspections(inspections);

        setPagination({ ...clientPagination, total: inspections.length });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }, 500)
  );

  const fetchInspections = useCallback(() => {
    debouncedFetchRef.current(filters, clientPagination);
  }, [clientPagination, filters]);

  useEffect(() => {
    fetchInspections();
  }, [fetchInspections]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchRef.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  return {
    inspections,
    loadingData,
    error,
    pagination,
    filters: {
      filters: filters,
      handleChangeFilters,
      handleResetFilters,
      getActiveFiltersCount,
    },
    fetchInspections,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  };
}
