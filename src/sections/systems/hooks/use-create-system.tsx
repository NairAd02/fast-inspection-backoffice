"use client";
import { useCallback, useState } from "react";
import { SystemCreate } from "../form/new/schemas/system-create-schema";
import { createSystem as createSystemService } from "@/lib/services/systems";
import { convertSystemCreateDTO } from "@/lib/types/systems";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateSystem({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSystem = useCallback(
    async (system: SystemCreate, configVersion: string) => {
      try {
        setLoading(true);
        setError(null);

        const res = await createSystemService(
          convertSystemCreateDTO(system, configVersion)
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError("Error en la creación del sistema");
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
    createSystem,
  };
}
