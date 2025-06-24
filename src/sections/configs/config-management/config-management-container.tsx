import ConfigGeneralInformationSectionContainer from "./config-general-information-section/config-general-information-section-container";
import { Suspense } from "react";
import { paths } from "@/routes/path";
import ConfigManagementSectionsContainer from "./config-management-sections/config-management-sections-container";
import DetailsSectionHeader from "@/components/details-section-header/details-section-header";

interface Props {
  version: string;
}

export default function ConfigManagementContainer({ version }: Props) {
  return (
    <div className="min-h-screen  p-6">
      <div className="space-y-6">
        <DetailsSectionHeader
          href={paths.configs.root}
          title="Administrar Configuración"
          description="Gestiona los detalles y secciones de la configuración"
        />
        {/* Config General Information */}
        <Suspense fallback={<div>Cargando información general...</div>}>
          <ConfigGeneralInformationSectionContainer version={version} />
        </Suspense>

        {/* Config Management Sections */}
        <ConfigManagementSectionsContainer version={version} />
      </div>
    </div>
  );
}
