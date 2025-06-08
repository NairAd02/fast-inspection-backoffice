"use client";
import { useCallback, useState } from "react";
import { ConfigCreate } from "../form/new/schemas/config-create-schema";
import { createConfig as createConfigService } from "@/lib/services/configs";
import { convertConfigCreateDTO } from "@/lib/types/configs";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateConfig({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createConfig = useCallback(
    async (config: ConfigCreate) => {
      try {
        setLoading(true);
        setError(null);

        const res = await createConfigService(convertConfigCreateDTO(config));
        if (!res.response || res.error) {
          console.log(res.error);
          setError("Error en la creación de la configuración");
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
    createConfig,
  };
}
