import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Settings, AlertCircle, TrendingUp } from "lucide-react";
import { CriticalityBadge } from "./criticality-badge";
import { InspectionDetails } from "@/lib/types/inspections";
import { formatDate } from "@/lib/format-date";

interface InspectionHeaderProps {
  inspection: InspectionDetails;
}

export function InspectionHeader({ inspection }: InspectionHeaderProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Inspección #{inspection._id}
          </CardTitle>
          <CriticalityBadge
            value={inspection.indiceCriticidad}
            className="self-start sm:self-center"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Fecha de Inicio
              </p>
              <p className="font-semibold text-gray-900">{formatDate(inspection.fechaInicio)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <Settings className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Versión Config
              </p>
              <p className="font-semibold text-gray-900">
                v{inspection.configVersion}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Deterioros
              </p>
              <p className="font-semibold text-gray-900">
                {inspection.cantDeterioros}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Sistemas
              </p>
              <p className="font-semibold text-gray-900">
                {inspection.sistemas.length}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
