import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ConfigGeneralInformationSectionContainer from "./config-general-information-section/config-general-information-section-container";
import { Suspense } from "react";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { paths } from "@/routes/path";
import ConfigManagementSectionsContainer from "./config-management-sections/config-management-sections-container";

interface Props {
  version: string;
}

export default function ConfigManagementContainer({ version }: Props) {
  return (
    <div className="min-h-screen  p-6">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <NavigationComponent href={paths.configs.root}>
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </NavigationComponent>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Administrar Configuración
            </h1>
            <p className="text-gray-600">
              Gestiona los detalles y secciones de tu configuración
            </p>
          </div>
        </div>

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
