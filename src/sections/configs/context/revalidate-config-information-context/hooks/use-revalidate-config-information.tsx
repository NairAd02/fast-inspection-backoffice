"use client";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { useCallback } from "react";

interface Props {
  configVersion: string;
}

export default function useRevalidateConfigInformation({
  configVersion,
}: Props) {
  const revalidateConfigInformation = useCallback(async () => {
    await revalidateServerTags(
      tagsCacheByRoutes.configs.systemsTag + ": " + configVersion
    );
    await revalidateServerTags(tagsCacheByRoutes.configs.singleTag);
  }, [configVersion]);

  return { revalidateConfigInformation };
}
