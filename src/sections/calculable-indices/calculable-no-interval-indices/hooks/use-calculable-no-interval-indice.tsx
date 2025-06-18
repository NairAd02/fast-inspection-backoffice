"use client";

import { getCalculableNoIntervalIndiceById } from "@/lib/services/calculable-no-interval-indices";
import { CalculableNoIntervalIndiceDetails } from "@/lib/types/calculable-no-interval-indices";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useCalculableNoIntervalIndice({ id }: Props) {
  const [calculableNoIntervalIndice, setCalculableNoIntervalIndice] =
    useState<CalculableNoIntervalIndiceDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchCalculableNoIntervalIndice = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getCalculableNoIntervalIndiceById(id);

        if (!res.response || res.error)
          throw new Error(
            "Error al cargar la información del índice calculable"
          );

        setCalculableNoIntervalIndice(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchCalculableNoIntervalIndice();
  }, [fetchCalculableNoIntervalIndice]);
  return {
    calculableNoIntervalIndice,
    error,
    loading,
    fetchCalculableNoIntervalIndice,
  };
}
