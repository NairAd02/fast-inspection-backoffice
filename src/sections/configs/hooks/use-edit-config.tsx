"use client";
import { useCallback, useState } from "react";
import { ConfigEdit } from "../form/edit/schemas/config-edit-schema";
import { editConfig as editConfigService } from "@/lib/services/configs";
import { convertConfigEditDTO } from "@/lib/types/configs";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditConfig({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editConfig = useCallback(
    async (config: ConfigEdit) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editConfigService(id, convertConfigEditDTO(config));
        if (!res.response || res.error)
          setError(res.error?.reason || "Error en la edición de la configuración");
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
    editConfig,
  };
}
