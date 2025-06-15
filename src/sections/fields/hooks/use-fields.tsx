"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import useClientPagination from "@/hooks/use-client-pagination";
import { Pagination } from "@/lib/types/pagination";
import useFieldsFilters from "../filters/hooks/use-fields-filters";
import { Field } from "@/lib/types/fields";
import { getFieldsList } from "@/lib/services/fields";

export default function useFields() {
  const [fields, setFields] = useState<Field[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const {
    pagination: clientPagination,
    setPagination: setClientPagination,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  } = useClientPagination();
  const [pagination, setPagination] = useState<Pagination>(clientPagination);
  const { filters, handleChangeFilters, handleResetFilters } = useFieldsFilters(
    { setPagination: setClientPagination }
  );

  const debouncedFetchRef = useRef(
    debounce(async (filters, clientPagination) => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await getFieldsList({
          pagination: {
            page: clientPagination.page,
            perPage: clientPagination.pageSize,
          },
          search: filters.search,
        });

        if (!res.response || res.error)
          throw new Error("Error al cargar los campos");

        const fields = res.response.data;
        setFields(fields);

        setPagination({ ...clientPagination, total: fields.length });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }, 500)
  );

  const fetchFields = useCallback(() => {
    debouncedFetchRef.current(filters, clientPagination);
  }, [clientPagination, filters]);

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchRef.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  return {
    fields,
    loadingData,
    error,
    pagination,
    filters,
    fetchFields,
    clientHandleChangePage,
    clientHandlePageSizeChange,
    handleChangeFilters,
    handleResetFilters,
  };
}
