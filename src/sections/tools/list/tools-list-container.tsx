import { getToolsList } from "@/lib/services/tools";
import React from "react";
import ToolsList from "./tools-list";

interface Props {
  configVersion: string;
}

export default async function ToolsListContainer({ configVersion }: Props) {
  const { response, error } = await getToolsList({
    versionConfig: configVersion,
  });
  if (!response || error) throw new Error("Error fetching tools");
  const tools = response.data;
  return <ToolsList tools={tools} />;
}
