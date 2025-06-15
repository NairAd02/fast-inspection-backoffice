import ToolsList from "@/sections/tools/list/tools-list";
import React from "react";

interface Props {
  configVersion: string;
}

export default function ToolsSection({ configVersion }: Props) {
  return <ToolsList configVersion={configVersion} />;
}
