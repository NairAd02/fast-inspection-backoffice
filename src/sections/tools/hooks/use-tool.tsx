"use client";

import { getToolById } from "@/lib/services/tools";
import { ToolDetails } from "@/lib/types/tools";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useTool({ id }: Props) {
  const [tool, setTool] = useState<ToolDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchTool = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getToolById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información de la herramienta");

        setTool(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchTool();
  }, [fetchTool]);
  return { tool, error, loading, fetchTool };
}
