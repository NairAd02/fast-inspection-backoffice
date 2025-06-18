"use client";
import { useCallback, useState } from "react";
import { editCalculableNoIntervalIndice as editCalculableNoIntervalIndiceService } from "@/lib/services/calculable-no-interval-indices";
import { convertCalculableNoIntervalIndiceEditDTO } from "@/lib/types/calculable-no-interval-indices";
import { CalculableNoIntervalIndiceEdit } from "../form/edit/schemas/calculable-no-interval-edit-schema";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditCalculableNoIntervalIndice({
  id,
  onEditAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editCalculableNoIntervalIndice = useCallback(
    async (calculableNoIntervalIndice: CalculableNoIntervalIndiceEdit) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editCalculableNoIntervalIndiceService(
          id,
          convertCalculableNoIntervalIndiceEditDTO(calculableNoIntervalIndice)
        );
        if (!res.response || res.error)
          setError("Error en la edición de la índice calculable");
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
    editCalculableNoIntervalIndice,
  };
}
