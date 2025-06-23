"use client";
import { useCallback, useState } from "react";
import { createEdification as createEdificationService } from "@/lib/services/edifications";
import { EdificationCreate } from "../form/new/schemas/edification-create-schema";
import { convertEdificationCreateDTO } from "@/lib/types/edifications";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateEdification({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEdification = useCallback(
    async (edification: EdificationCreate) => {
      try {
        setLoading(true);
        setError(null);

        const res = await createEdificationService(
          convertEdificationCreateDTO(edification)
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError(
            res.error?.reason || "Error en la creación de la edificación"
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
    createEdification,
  };
}
