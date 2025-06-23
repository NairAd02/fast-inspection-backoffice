"use client";
import { useCallback, useState } from "react";
import { SystemEdit } from "../form/edit/schemas/system-edit-schema";
import { editSystem as editSystemService } from "@/lib/services/systems";
import { convertSystemEditDTO } from "@/lib/types/systems";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditSystem({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editSystem = useCallback(
    async (system: SystemEdit) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editSystemService(id, convertSystemEditDTO(system));
        if (!res.response || res.error)
          setError(res.error?.reason || "Error en la edición del sistema");
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
    editSystem,
  };
}
