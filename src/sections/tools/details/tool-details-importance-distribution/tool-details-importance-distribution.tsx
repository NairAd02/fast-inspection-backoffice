import { ToolDetails } from "@/lib/types/tools";
import React from "react";

interface Props {
  tool: ToolDetails;
}

export default function ToolDetailsImportanceDistribution({ tool }: Props) {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-3">
        Distribución de importancia
      </h3>
      <div className="space-y-2">
        {[
          {
            label: "Baja (1)",
            count: tool.campos.filter((f) => f.nivelImportancia === 1).length,
            color: "green-300",
          },
          {
            label: "Media (2)",
            count: tool.campos.filter((f) => f.nivelImportancia === 2).length,
            color: "primary",
          },
          {
            label: "Alta (2)",
            count: tool.campos.filter((f) => f.nivelImportancia === 3).length,
            color: "destructive",
          },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex items-center gap-2 w-32">
              <div className={`w-3 h-3 rounded-full bg-${item.color}`}></div>
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${item.color}`}
                style={{
                  width:
                    tool.campos.length > 0
                      ? `${(item.count / tool.campos.length) * 100}%`
                      : "0%",
                }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 w-8 text-right">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
