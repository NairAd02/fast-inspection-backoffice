import { Badge } from "@/components/ui/badge";
import { getImportanceInfo, ToolDetails } from "@/lib/types/tools";
import { SettingsIcon } from "lucide-react";
import React from "react";

interface Props {
  tool: ToolDetails;
}

export default function ToolDetailsFields({ tool }: Props) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Campos de la herramienta</h3>
      {tool.campos.length > 0 ? (
        <div className="space-y-3">
          {/* Sort fields by importance level (highest first) */}
          {tool.campos
            .sort((a, b) => b.nivelImportancia - a.nivelImportancia)
            .map((field) => {
              const importanceInfo = getImportanceInfo(field.nivelImportancia);
              return (
                <div
                  key={field.id}
                  className="border border-gray-200 rounded-md p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {field.nombre}
                    </h4>
                    <div className="flex flex-col gap-2">
                      <p className="font-medium text-gray-900">Importancia </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          color={importanceInfo.variant}
                          className="text-xs"
                        >
                          {importanceInfo.text}
                        </Badge>
                        <span
                          className={`text-sm font-semibold ${importanceInfo.color}`}
                        >
                          {field.nivelImportancia}/3
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-md border border-gray-200">
          <SettingsIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">
            No hay campos definidos para esta herramienta
          </p>
        </div>
      )}
    </div>
  );
}
