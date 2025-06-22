import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Hash, ImageIcon, List } from "lucide-react";
import { InspectionDefinedField } from "@/lib/types/inspection-defined-fields";
import { DefinedFieldTypes } from "@/lib/types/defined-fields";
import Image from "next/image";

interface DefinedFieldDisplayProps {
  field: InspectionDefinedField;
}

export function DefinedFieldDisplay({ field }: DefinedFieldDisplayProps) {
  const getFieldIcon = (type: DefinedFieldTypes) => {
    switch (type) {
      case DefinedFieldTypes.IMAGE:
        return <ImageIcon className="h-4 w-4" />;
      case DefinedFieldTypes.TEXT:
        return <FileText className="h-4 w-4" />;
      case DefinedFieldTypes.NUMERIC:
        return <Hash className="h-4 w-4" />;
      case DefinedFieldTypes.SELECTION:
        return <List className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getFieldTypeLabel = (type: DefinedFieldTypes) => {
    switch (type) {
      case DefinedFieldTypes.IMAGE:
        return "Imagen";
      case DefinedFieldTypes.TEXT:
        return "Texto";
      case DefinedFieldTypes.NUMERIC:
        return "Numérico";
      case DefinedFieldTypes.SELECTION:
        return "Selección";
      default:
        return "Desconocido";
    }
  };

  const renderFieldValue = () => {
    if (field.tipo === DefinedFieldTypes.IMAGE) {
      return (
        <div className="mt-2">
          <Image
            src={field.valor}
            alt={field.nombre}
            className="max-w-full h-auto rounded-lg shadow-sm max-h-48 object-cover"
            width={800}
            height={800}
          />
        </div>
      );
    }

    return (
      <p className="text-sm text-gray-700 mt-1 font-medium">{field.valor}</p>
    );
  };

  return (
    <Card className="bg-gray-50 border-gray-200">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getFieldIcon(field.tipo)}
            <span className="font-medium text-sm">{field.nombre}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {getFieldTypeLabel(field.tipo)}
          </Badge>
        </div>
        {renderFieldValue()}
      </CardContent>
    </Card>
  );
}
