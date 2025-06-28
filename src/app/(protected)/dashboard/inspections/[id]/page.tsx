import { getInspectionById } from "@/lib/services/inspections";
import InspectionDetailsContainer from "@/sections/inspections/details/inspection-details-container";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Detalles de Inspección",
  description:
    "Visualice los detalles y realice análisis sobre la inspección especificada",
};

export default async function InspectionPage({ params }: Props) {
  const res = await getInspectionById((await params).id);

  if (!res.response || res.error) throw new Error("Error fetching inspection");
  const inspection = res.response;
  return <InspectionDetailsContainer inspection={inspection} />;
}
