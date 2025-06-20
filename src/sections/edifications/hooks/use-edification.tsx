"use client";

import { getEdificationById } from "@/lib/services/edifications";
import { EdificationDetails } from "@/lib/types/edifications";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useEdification({ id }: Props) {
  const [edification, setEdification] = useState<EdificationDetails | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchEdification = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getEdificationById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información de la edificación");

        setEdification(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchEdification();
  }, [fetchEdification]);
  return { edification, error, loading, fetchEdification };
}
