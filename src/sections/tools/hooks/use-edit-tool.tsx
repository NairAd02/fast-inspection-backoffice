"use client";
import { useCallback, useState } from "react";
import { editTool as editToolService } from "@/lib/services/tools";
import { convertToolEditDTO } from "@/lib/types/tools";
import { ToolEdit } from "../form/edit/schemas/tool-edit-schema";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditTool({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editTool = useCallback(
    async (tool: ToolEdit) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editToolService(id, convertToolEditDTO(tool));
        if (!res.response || res.error)
          setError("Error en la edición de la herramienta");
        else {
          onEditAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onEditAction, id]
  );
  return {
    loading,
    error,
    editTool,
  };
}
