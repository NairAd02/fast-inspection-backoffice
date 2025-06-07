import React from "react";
import {
  ClipboardCheck,
  BarChart3,
  Shield,
  Users,
  Calendar,
  MapPin,
} from "lucide-react";
import FeatureCard from "@/components/feature-card/feature-card";

export default function HomeFeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas para gestionar inspecciones
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Herramientas profesionales diseñadas específicamente para
            inspectores y administradores de proyectos de construcción.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<ClipboardCheck className="h-6 w-6 text-blue-600" />}
            title="Inspecciones Digitales"
            desciption="Crea y gestiona inspecciones detalladas con formularios
                  personalizables y captura de evidencias fotográficas."
          />
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6 text-green-600" />}
            title="Reportes Avanzados"
            desciption="Genera reportes profesionales automáticamente con gráficos,
                  estadísticas y análisis detallados de cada inspección."
          />

          <FeatureCard
            icon={<Users className="h-6 w-6 text-purple-600" />}
            title="Gestión de Equipos"
            desciption="Asigna inspecciones a tu equipo, controla permisos y mantén la
                colaboración fluida entre todos los miembros."
          />

          <FeatureCard
            icon={<MapPin className="h-6 w-6 text-orange-600" />}
            title="Geolocalización"
            desciption="Registra la ubicación exacta de cada inspección con mapas
                interactivos y coordenadas GPS precisas."
          />

          <FeatureCard
            icon={<Shield className="h-6 w-6 text-red-600" />}
            title="Seguridad Total"
            desciption="Protege tus datos con encriptación de nivel empresarial y cumple
                con todas las normativas de seguridad."
          />

          <FeatureCard
            icon={<Calendar className="h-6 w-6 text-teal-600" />}
            title="Programación"
            desciption="Programa inspecciones automáticas, establece recordatorios y
                mantén un calendario organizado de todas tus actividades."
          />
        </div>
      </div>
    </section>
  );
}
