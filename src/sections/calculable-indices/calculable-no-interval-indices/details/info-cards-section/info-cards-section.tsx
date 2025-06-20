import InfoCard from "@/components/info-card/info-card";
import { CalculableNoIntervalIndiceDetails } from "@/lib/types/calculable-no-interval-indices";
import { BarChart3Icon, TagIcon } from "lucide-react";
import React from "react";

interface Props {
  calculableNoIntervalIndice: CalculableNoIntervalIndiceDetails;
}

export default function InfoCardsSection({
  calculableNoIntervalIndice,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <InfoCard
        title="Tipo"
        icon={<TagIcon className="w-4 h-4 text-slate-600" />}
        description={
          calculableNoIntervalIndice.tipo === "indiceCalculableSinIntervalo"
            ? "Sin Intervalo"
            : "Con Intervalo"
        }
      />
      <InfoCard
        title="Indicadores"
        icon={<BarChart3Icon className="w-4 h-4 text-emerald-600" />}
        description={`${calculableNoIntervalIndice.indicadoresSinIntervalos.length} elementos`}
      />
    </div>
  );
}
