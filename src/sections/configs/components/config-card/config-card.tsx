"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Settings, Edit, Trash2, Power } from "lucide-react";
import { Config } from "@/lib/types/configs";

interface Props {
  config: Config;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ConfigCard({
  config: { version, nombre, descripcion, state, porcentajeCompletitud },
  onEdit,
  onDelete,
}: Props) {
  const porcentajeDisplay = porcentajeCompletitud * 100;

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg leading-tight">{nombre}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  v{version}
                </Badge>
                <Badge
                  variant={state ? "default" : "secondary"}
                  className={`text-xs ${
                    state
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {state ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 min-h-0 gap-4">
        <div className="flex flex-col flex-1 min-h-0 gap-2">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 break-words">
            {descripcion}
          </p>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Completitud
              </span>
              <span className="text-sm font-semibold text-blue-600">
                {porcentajeDisplay}%
              </span>
            </div>
            <Progress value={porcentajeDisplay} className="h-2" />
          </div>
        </div>

        <div className="flex gap-2 justify-between items-center pt-2 border-t">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3"
              onClick={() => {
                onEdit(version.toString());
              }}
            >
              <Edit className="h-3 w-3 mr-1" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`h-8 px-3 ${
                state
                  ? "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                  : "text-green-600 hover:text-green-700 hover:bg-green-50"
              }`}
              disabled={state ? false : porcentajeCompletitud < 1}
            >
              <Power className="h-3 w-3 mr-1" />
              {state ? "Desactivar" : "Activar"}
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => {
              onDelete(version.toString());
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
