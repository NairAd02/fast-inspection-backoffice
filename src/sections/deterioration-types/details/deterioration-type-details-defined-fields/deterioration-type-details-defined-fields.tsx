import { Badge } from "@/components/ui/badge";
import {
  DefinedFieldTypes,
  getFieldTypeDisplayName,
  NumericDefinedField,
  SelectionDefinedField,
} from "@/lib/types/defined-fields";
import { DeteriorationTypeDetails } from "@/lib/types/deterioration-type";
import { CheckSquare, Hash, ImageIcon, Settings, Type } from "lucide-react";
import React from "react";

interface Props {
  deteriorationType: DeteriorationTypeDetails;
}

export default function DeteriorationTypeDetailsDefinedFields({
  deteriorationType,
}: Props) {
  const getFieldTypeIcon = (type: DefinedFieldTypes) => {
    switch (type) {
      case DefinedFieldTypes.IMAGE:
        return <ImageIcon className="h-4 w-4" />;
      case DefinedFieldTypes.TEXT:
        return <Type className="h-4 w-4" />;
      case DefinedFieldTypes.NUMERIC:
        return <Hash className="h-4 w-4" />;
      case DefinedFieldTypes.SELECTION:
        return <CheckSquare className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Campos definidos</h3>
      {deteriorationType.camposDefinidos.length > 0 ? (
        <div className="space-y-4">
          {deteriorationType.camposDefinidos.map((field) => (
            <div
              key={field.id}
              className="border border-gray-200 rounded-md p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                {getFieldTypeIcon(field.tipo)}
                <h4 className="font-medium text-gray-900">{field.nombre}</h4>
                <Badge variant="outline" className="text-xs">
                  {getFieldTypeDisplayName(field.tipo)}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mb-2">ID: {field.id}</p>

              {/* Type-specific details */}
              {field.tipo === DefinedFieldTypes.NUMERIC && (
                <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Rango:</span>
                      <p className="font-medium">
                        {(field as NumericDefinedField).inicioIntervalo} -{" "}
                        {(field as NumericDefinedField).finalIntervalo}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Unidad:</span>
                      <p className="font-medium">
                        {(field as NumericDefinedField).unidadMedida}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {field.tipo === DefinedFieldTypes.SELECTION && (
                <div className="bg-green-50 p-3 rounded-md border border-green-200">
                  <span className="text-sm text-gray-500">
                    Opciones disponibles:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(field as SelectionDefinedField).opciones.map(
                      (option, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {option}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-gray-500">No hay campos definidos</p>
        </div>
      )}
    </div>
  );
}
