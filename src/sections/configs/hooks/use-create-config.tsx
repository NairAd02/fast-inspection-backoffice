"use client";
import { useCallback, useState } from "react";
import { ConfigCreate } from "../form/new/schemas/config-create-schema";
import {
  createConfigByOtherConfig,
  createConfig as createConfigService,
} from "@/lib/services/configs";
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
        const { configReplicate, ...restConfig } = config;

        const res =
          configReplicate === ""
            ? await createConfigService(convertConfigCreateDTO(restConfig))
            : await createConfigByOtherConfig(
                configReplicate,
                convertConfigCreateDTO(restConfig)
              );
        if (!res.response || res.error) {
          setError(res.error?.reason || "Error en la creación de la configuración");
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
