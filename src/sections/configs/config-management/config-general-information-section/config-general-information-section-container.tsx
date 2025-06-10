import { getConfigById } from "@/lib/services/configs";
import React from "react";
import ConfigGeneralInformationSection from "./config-general-information-section";

interface Props {
  version: string;
}

export default async function ConfigGeneralInformationSectionContainer({
  version,
}: Props) {
  const { response, error } = await getConfigById(version);
  if (!response || error) throw new Error("Error fetching config");
  const config = response;
  return <ConfigGeneralInformationSection config={config} />;
}
