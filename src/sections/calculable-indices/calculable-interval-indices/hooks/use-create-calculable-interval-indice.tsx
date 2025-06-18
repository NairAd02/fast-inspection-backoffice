"use client";
import { useCallback, useState } from "react";
import { CalculableIntervalIndiceCreate } from "../form/new/schemas/calculable-interval-indice-create-schema";
import { createCalculableIntervalIndice as createCalculableIntervalIndiceService } from "@/lib/services/calculable-interval-indices";
import { convertCalculableIntervalIndiceCreateDTO } from "@/lib/types/calculable-interval-indices";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateCalculableIntervalIndice({
  onCreateAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCalculableIntervalIndice = useCallback(
    async (
      calculableIntervalIndice: CalculableIntervalIndiceCreate,
      configVersion: string
    ) => {
      try {
        setLoading(true);
        setError(null);

        const res = await createCalculableIntervalIndiceService(
          convertCalculableIntervalIndiceCreateDTO(
            calculableIntervalIndice,
            configVersion
          )
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError("Error en la creación del índice calculable con intervalo");
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
    createCalculableIntervalIndice,
  };
}
