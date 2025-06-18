"use client";
import { useCallback, useState } from "react";
import { CalculableNoIntervalIndiceCreate } from "../form/new/schemas/calculable-no-interval-indice-create-schema";
import { createCalculableNoIntervalIndice as createCalculableNoIntervalIndiceService } from "@/lib/services/calculable-no-interval-indices";
import { convertCalculableNoIntervalIndiceCreateDTO } from "@/lib/types/calculable-no-interval-indices";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateCalculableNoIntervalIndice({
  onCreateAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCalculableNoIntervalIndice = useCallback(
    async (
      calculableNoIntervalIndice: CalculableNoIntervalIndiceCreate,
      configVersion: string
    ) => {
      try {
        setLoading(true);
        setError(null);

        const res = await createCalculableNoIntervalIndiceService(
          convertCalculableNoIntervalIndiceCreateDTO(
            calculableNoIntervalIndice,
            configVersion
          )
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError("Error en la creación del índice calculable sin intervalo");
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
    createCalculableNoIntervalIndice,
  };
}
