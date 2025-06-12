"use client";

import { getMaterialById } from "@/lib/services/materials";
import { Material } from "@/lib/types/materials";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useMaterial({ id }: Props) {
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchMaterial = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getMaterialById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información del material");

        setMaterial(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchMaterial();
  }, [fetchMaterial]);
  return { material, error, loading, fetchMaterial };
}
