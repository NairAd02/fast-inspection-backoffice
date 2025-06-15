"use client";
import { deleteDeteriorationType as deleteDeteriorationTypeService } from "@/lib/services/deterioration-types";
import { useCallback, useState } from "react";

interface Props {
  id: string | null;
  onDeleteAction: () => void;
}

export default function useDeleteDeteriorationType({
  id,
  onDeleteAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteDeteriorationType = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await deleteDeteriorationTypeService(id);

        if (!res.response || res.error)
          throw new Error("Error durante la eliminación del tipo de deterioro");
        else onDeleteAction();
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id, onDeleteAction]);

  return { error, loading, deleteDeteriorationType };
}
