import ToolsListContainer from "@/sections/tools/list/tools-list-container";
import React from "react";

interface Props {
  configVersion: string;
}

export default function ToolsSection({ configVersion }: Props) {
  return <ToolsListContainer configVersion={configVersion} />;
}
