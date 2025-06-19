"use client";

import { getCalculableIntervalIndiceById } from "@/lib/services/calculable-interval-indices";
import { CalculableIntervalIndiceDetails } from "@/lib/types/calculable-interval-indices";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useCalculableIntervalIndice({ id }: Props) {
  const [calculableIntervalIndice, setCalculableIntervalIndice] =
    useState<CalculableIntervalIndiceDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchCalculableIntervalIndice = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getCalculableIntervalIndiceById(id);

        if (!res.response || res.error)
          throw new Error(
            "Error al cargar la información del índice calculable"
          );

        setCalculableIntervalIndice(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchCalculableIntervalIndice();
  }, [fetchCalculableIntervalIndice]);
  return {
    calculableIntervalIndice,
    error,
    loading,
    fetchCalculableIntervalIndice,
  };
}
