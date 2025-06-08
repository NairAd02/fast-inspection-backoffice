"use client";

import { getConfigById } from "@/lib/services/configs";
import { ConfigDetails } from "@/lib/types/configs";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useConfig({ id }: Props) {
  const [config, setConfig] = useState<ConfigDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchConfig = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getConfigById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información de la configuración");

        setConfig(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);
  return { config, error, loading, fetchConfig };
}
