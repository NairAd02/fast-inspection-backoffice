"use client";

import { getDeteriorationTypeById } from "@/lib/services/deterioration-types";
import { DeteriorationTypeDetails } from "@/lib/types/deterioration-type";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useDeteriorationType({ id }: Props) {
  const [deteriorationType, setDeteriorationType] =
    useState<DeteriorationTypeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchDeteriorationType = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getDeteriorationTypeById(id);

        if (!res.response || res.error)
          throw new Error(
            "Error al cargar la información del tipo de deterioro"
          );

        setDeteriorationType(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchDeteriorationType();
  }, [fetchDeteriorationType]);
  return { deteriorationType, error, loading, fetchDeteriorationType };
}
