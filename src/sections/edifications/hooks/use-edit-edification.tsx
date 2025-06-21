"use client";
import { useCallback, useState } from "react";
import { editEdification as editEdificationService } from "@/lib/services/edifications";
import { convertEdificationEditDTO } from "@/lib/types/edifications";
import { EdificationEdit } from "../form/edit/schemas/edification-edit-schema";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditEdification({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editEdification = useCallback(
    async (edification: EdificationEdit) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editEdificationService(
          id,
          convertEdificationEditDTO(edification)
        );
        if (!res.response || res.error)
          setError("Error en la edición de la edificación");
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
    editEdification,
  };
}
