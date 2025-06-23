"use client";
import { useCallback, useState } from "react";
import { CalculableIntervalIndiceEdit } from "../form/edit/schemas/calculable-interval-indice-edit-schema";
import { editCalculableIntervalIndice as editCalculableIntervalIndiceService } from "@/lib/services/calculable-interval-indices";
import { convertCalculableIntervalIndiceEditDTO } from "@/lib/types/calculable-interval-indices";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditCalculableIntervalIndice({
  id,
  onEditAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editCalculableIntervalIndice = useCallback(
    async (calculableIntervalIndice: CalculableIntervalIndiceEdit) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editCalculableIntervalIndiceService(
          id,
          convertCalculableIntervalIndiceEditDTO(calculableIntervalIndice)
        );
        if (!res.response || res.error)
          setError(
            res.error?.reason || "Error en la edición de la índice calculable"
          );
        else {
          onEditAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onEditAction, id]
  );
  return {
    loading,
    error,
    editCalculableIntervalIndice,
  };
}
