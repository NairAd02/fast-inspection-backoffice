"use client";
import { deleteTool as deleteToolService } from "@/lib/services/tools";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteTool({ id, onDeleteAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteTool = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await deleteToolService(id);

        if (!res.response || res.error)
          throw new Error("Error durante la eliminación de la herramienta");
        else onDeleteAction();
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteTool };
}
