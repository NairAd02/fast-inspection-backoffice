"use client";
import { useCallback, useState } from "react";
import { SubsystemCreate } from "../form/new/schemas/subsystem-create-schema";
import { createSubsystem as createSubsystemService } from "@/lib/services/subsystems";
import { convertSubsystemCreateDTO } from "@/lib/types/subsystems";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateSubsystem({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubsystem = useCallback(
    async (subsystem: SubsystemCreate, systemId: string) => {
      try {
        setLoading(true);
        setError(null);

        const res = await createSubsystemService(
          convertSubsystemCreateDTO(subsystem, systemId)
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError(res.error?.reason || "Error en la creación del subsistema");
        } else {
          onCreateAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onCreateAction]
  );
  return {
    loading,
    error,
    createSubsystem,
  };
}
