"use client";
import { useCallback, useState } from "react";
import { DeteriorationTypeEdit } from "../form/edit/schemas/deterioration-type-edit-schema";
import { editDeteriorationType as editDeteriorationTypeService } from "@/lib/services/deterioration-types";
import { convertDeteriorationTypeEditDTO } from "@/lib/types/deterioration-type";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditDeteriorationType({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editDeteriorationType = useCallback(
    async (deteriorationType: DeteriorationTypeEdit) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editDeteriorationTypeService(
          id,
          convertDeteriorationTypeEditDTO(deteriorationType)
        );
        if (!res.response || res.error)
          setError(
            res.error?.reason || "Error en la edición del tipo de deterioro"
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
    editDeteriorationType,
  };
}
