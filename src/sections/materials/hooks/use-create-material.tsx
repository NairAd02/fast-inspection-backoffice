"use client";
import { useCallback, useState } from "react";
import { createMaterial as createMaterialService } from "@/lib/services/materials";
import { convertMaterialCreateDTO } from "@/lib/types/materials";
import { MaterialCreate } from "../form/new/schemas/material-create-schema";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateMaterial({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMaterial = useCallback(
    async (material: MaterialCreate, subsystemId: string) => {
      try {
        setLoading(true);
        setError(null);

        const res = await createMaterialService(
          convertMaterialCreateDTO(material, subsystemId)
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError("Error en la creación del material");
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
    createMaterial,
  };
}
