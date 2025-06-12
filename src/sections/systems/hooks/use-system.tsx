"use client";

import { getSystemById } from "@/lib/services/systems";
import { System } from "@/lib/types/systems";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useSystem({ id }: Props) {
  const [system, setSystem] = useState<System | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchSystem = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getSystemById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información del sistema");

        setSystem(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchSystem();
  }, [fetchSystem]);
  return { system, error, loading, fetchSystem };
}
