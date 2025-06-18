"use client";
import { deleteCalculableIndice as deleteCalculableIndiceService } from "@/lib/services/calculable-indices";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteCalculableIndice({
  id,
  onDeleteAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteIndiceCalculable = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await deleteCalculableIndiceService(id);

        if (!res.response || res.error)
          throw new Error("Error durante la eliminación del índice calculable");
        else onDeleteAction();
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteIndiceCalculable };
}
