"use client";
import { useCallback, useState } from "react";
import { DeteriorationTypeCreate } from "../form/new/schemas/deterioration-type-create-schema";
import { createDeteriorationType as createDeteriorationTypeService } from "@/lib/services/deterioration-types";
import { convertDeteriorationTypeCreateDTO } from "@/lib/types/deterioration-type";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateDeteriorationType({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDeteriorationType = useCallback(
    async (deteriorationType: DeteriorationTypeCreate, materialId: string) => {
      try {
        setLoading(true);
        setError(null);

        const res = await createDeteriorationTypeService(
          convertDeteriorationTypeCreateDTO(deteriorationType, materialId)
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError(
            res.error?.reason || "Error en la creación del tipo de deterioro"
          );
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
    createDeteriorationType,
  };
}
