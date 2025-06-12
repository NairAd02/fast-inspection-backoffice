"use client";
import { useCallback, useState } from "react";
import { editSubsystem as editSubsystemService } from "@/lib/services/subsystems";
import { convertSubsystemEditDTO } from "@/lib/types/subsystems";
import { SubsystemEdit } from "../form/edit/schemas/subsystem-edit-schema";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditSubsystem({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editSubsystem = useCallback(
    async (subsystem: SubsystemEdit) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editSubsystemService(
          id,
          convertSubsystemEditDTO(subsystem)
        );
        if (!res.response || res.error)
          setError("Error en la edición del subsistema");
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
    editSubsystem,
  };
}
