import { getSystemsConfig } from "@/lib/services/configs";
import React from "react";
import InspectionsStructureSection from "./inspections-structure-section";

interface Props {
  version: string;
}

export default async function InspectionsStructureSectionContainer({
  version,
}: Props) {
  const { response, error } = await getSystemsConfig(version);
  if (!response || error) throw new Error("Error fetching systems");
  const systems = response;

  return (
    <InspectionsStructureSection configVersion={version} systems={systems} />
  );
}
