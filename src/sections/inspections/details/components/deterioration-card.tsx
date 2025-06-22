import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { AlertTriangle, FileX } from "lucide-react";
import { Deterioration } from "@/lib/types/deteriorations";
import { DefinedFieldDisplay } from "./defined-field-display";

interface DeteriorationCardProps {
  deterioration: Deterioration;
}

export function DeteriorationCard({ deterioration }: DeteriorationCardProps) {
  return (
    <Card className="border-orange-200 bg-orange-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          Deterioro {deterioration.codigo}
          <Badge variant="outline" className="ml-auto">
            {deterioration.camposDefinidos.length} campos
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {deterioration.camposDefinidos.length > 0 ? (
          <div className="grid gap-3">
            {deterioration.camposDefinidos.map((field) => (
              <DefinedFieldDisplay key={field._id} field={field} />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FileX className="h-4 w-4" />
            No hay campos definidos
          </div>
        )}
      </CardContent>
    </Card>
  );
}
