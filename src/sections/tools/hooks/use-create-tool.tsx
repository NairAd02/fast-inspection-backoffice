"use client";
import { useCallback, useState } from "react";
import { ToolCreate } from "../form/new/schemas/tool-create-schema";
import { createTool as createToolService } from "@/lib/services/tools";
import { convertToolCreateDTO } from "@/lib/types/tools";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateTool({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTool = useCallback(
    async (tool: ToolCreate, configVersion: string) => {
      try {
        setLoading(true);
        setError(null);

        const res = await createToolService(
          convertToolCreateDTO(tool, configVersion)
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError(
            res.error?.reason || "Error en la creación de la herramienta"
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
    createTool,
  };
}
