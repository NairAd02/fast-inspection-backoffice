"use client";
import { Card, CardContent } from "@/components/ui/card";
import { TabsPanelProvider } from "@/components/ui/tabs-panel/context/tabs-panel-context";
import { TabsContainer } from "@/components/ui/tabs-panel/tabs-panel";
import React, { useMemo } from "react";
import InspectionsStructureSection from "./sections/inspections-structure-section/inspections-structure-section";
import SectionContainer from "./sections/section-container/section-container";
import ToolsSection from "./sections/tools-section/tools-section";
import IndicesSection from "./sections/indices-section/indices-section";

interface Props {
  version: string;
}

export default function ConfigManagementSections({ version }: Props) {
  const tabs = useMemo(
    () => [
      {
        label: "Estructura de las inspecciones",
        value: "1",
        component: (
          <SectionContainer
            title="Estructura de las Inspecciones"
            description="Administre la estructura de las inspecciones de esta configuración"
          >
            <InspectionsStructureSection />
          </SectionContainer>
        ),
      },
      {
        label: "Herramientas",
        value: "2",
        component: (
          <SectionContainer
            title="Herramientas"
            description="Administre las herramientas de esta configuración"
          >
            <ToolsSection />
          </SectionContainer>
        ),
      },
      {
        label: "Índices Calculables",
        value: "3",
        component: (
          <SectionContainer
            title="Índices Calculables"
            description="Administre los índices calculables de esta configuración"
          >
            <IndicesSection />
          </SectionContainer>
        ),
      },
    ],
    []
  );
  return (
    <Card>
      <CardContent className="p-4">
        <TabsPanelProvider initialTab={tabs[0].value}>
          <TabsContainer tabs={tabs} />
        </TabsPanelProvider>
      </CardContent>
    </Card>
  );
}
