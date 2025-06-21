"use client";
import { deleteEdification as deleteEdificationService } from "@/lib/services/edifications";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteEdification({ id, onDeleteAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteEdification = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await deleteEdificationService(id);

        if (!res.response || res.error)
          throw new Error("Error durante la eliminación de la edificación");
        else onDeleteAction();
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteEdification };
}
