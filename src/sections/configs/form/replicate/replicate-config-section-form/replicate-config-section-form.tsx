import { ConfigDetails } from "@/lib/types/configs";
import { SettingsIcon } from "lucide-react";
import React from "react";

interface Props {
  replicateConfig: ConfigDetails;
}

export default function ReplicateConfigSectionForm({ replicateConfig }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-primary rounded-lg">
          <SettingsIcon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Configuración a replicar
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Nombre</p>
          <p className="font-medium text-gray-900">{replicateConfig.nombre}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Versión</p>
          <p className="font-medium text-gray-900">{replicateConfig.version}</p>
        </div>
        {replicateConfig.descripcion && (
          <div className="col-span-2">
            <p className="text-xs text-gray-500">Descripción</p>
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-4 break-words">
              {replicateConfig.descripcion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
