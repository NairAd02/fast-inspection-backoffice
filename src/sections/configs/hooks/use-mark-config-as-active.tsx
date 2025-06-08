"use client";
import { useCallback, useState } from "react";
import { markConfigAsActive as markConfigAsActiveService } from "@/lib/services/configs";

interface Props {
  id: string;
  onMarkConfigAsActiveAction: () => void;
}

export default function useMarkConfigAsActive({
  id,
  onMarkConfigAsActiveAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markConfigAsActive = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await markConfigAsActiveService(id);
      if (!res.response || res.error)
        setError("Error en la activación de la configuración");
      else {
        onMarkConfigAsActiveAction();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [onMarkConfigAsActiveAction, id]);
  return {
    loading,
    error,
    markConfigAsActive,
  };
}
