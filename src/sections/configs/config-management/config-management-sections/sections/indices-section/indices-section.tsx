import CalculableIntervalIndicesList from "@/sections/calculable-indices/calculable-interval-indices/list/calculable-interval-indices-list";
import CalculableNoIntervalIndicesList from "@/sections/calculable-indices/calculable-no-interval-indices/list/calculable-no-interval-indices-list";
import React from "react";

interface Props {
  configVersion: string;
}

export default function IndicesSection({ configVersion }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <CalculableIntervalIndicesList configVersion={configVersion} />
      <CalculableNoIntervalIndicesList configVersion={configVersion} />
    </div>
  );
}
