"use client";

import { getSubsystemById } from "@/lib/services/subsystems";
import { Subsystem } from "@/lib/types/subsystems";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useSubsystem({ id }: Props) {
  const [subsystem, setSubsystem] = useState<Subsystem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchSubsystem = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getSubsystemById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información del subsistema");

        setSubsystem(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchSubsystem();
  }, [fetchSubsystem]);
  return { subsystem, error, loading, fetchSubsystem };
}
