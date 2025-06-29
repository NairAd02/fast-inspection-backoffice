import React, { useMemo } from "react";
import SectionContainer from "./sections/section-container/section-container";
import ToolsSection from "./sections/tools-section/tools-section";
import IndicesSection from "./sections/indices-section/indices-section";
import ConfigManagementSections from "./config-management-sections";
import InspectionsStructureSectionContainer from "./sections/inspections-structure-section/inspections-structure-section-container";
import { Building, PackageIcon, Ruler, Wrench } from "lucide-react";

interface Props {
  version: string;
}

export default function ConfigManagementSectionsContainer({ version }: Props) {
  const tabs = useMemo(
    () => [
      {
        label: "Estructura de las inspecciones",
        icon: <Building />,
        value: "1",
        component: (
          <SectionContainer
            title="Estructura de las Inspecciones"
            description="Administre la estructura de las inspecciones de esta configuración"
          >
            <InspectionsStructureSectionContainer version={version} />
          </SectionContainer>
        ),
      },
      {
        label: "Herramientas",
        icon: <Wrench />,
        value: "2",
        component: (
          <SectionContainer
            title="Herramientas"
            description="Administre las herramientas de esta configuración"
          >
            <ToolsSection configVersion={version} />
          </SectionContainer>
        ),
      },
      {
        label: "Índices Calculables",
        icon: <Ruler />,
        value: "3",
        component: (
          <SectionContainer
            title="Índices Calculables"
            description="Administre los índices calculables de esta configuración"
          >
            <IndicesSection configVersion={version} />
          </SectionContainer>
        ),
      },
    ],
    [version]
  );
  return <ConfigManagementSections tabs={tabs} />;
}
