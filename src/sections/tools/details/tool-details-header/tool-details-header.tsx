import { Badge } from "@/components/ui/badge";
import { ToolDetails, toolsTypeMap } from "@/lib/types/tools";
import { WrenchIcon } from "lucide-react";
import React from "react";

interface Props {
  tool: ToolDetails;
}

export default function ToolDetailsHeader({ tool }: Props) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold text-gray-900">{tool.nombre}</h2>
        <Badge variant="outline" className="bg-gray-100">
          <WrenchIcon className="h-3.5 w-3.5 mr-1" />
          Herramienta
        </Badge>
      </div>
      <p className="text-sm text-gray-500 mb-2">ID: {tool.id}</p>
      <Badge
        color={toolsTypeMap.get(tool.tipo)?.color as string}
        className="text-sm"
      >
        {toolsTypeMap.get(tool.tipo)?.name as string}
      </Badge>
    </div>
  );
}
