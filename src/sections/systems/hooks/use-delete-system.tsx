"use client";
import { deleteSystem as deleteSystemService } from "@/lib/services/systems";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteSystem({ id, onDeleteAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteSystem = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await deleteSystemService(id);

        if (!res.response || res.error)
          throw new Error("Error durante la eliminación del sistema");
        else onDeleteAction();
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteSystem };
}
