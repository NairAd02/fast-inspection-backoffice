import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ClipboardCheck,
  BarChart3,
  Shield,
  Users,
  Calendar,
  MapPin,
} from "lucide-react";

export default function HomeFeaturesSection() {
  return <section id="features" className="py-20 px-4 bg-gray-50">
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
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <ClipboardCheck className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Inspecciones Digitales</CardTitle>
                <CardDescription>
                  Crea y gestiona inspecciones detalladas con formularios
                  personalizables y captura de evidencias fotográficas.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Reportes Avanzados</CardTitle>
                <CardDescription>
                  Genera reportes profesionales automáticamente con gráficos,
                  estadísticas y análisis detallados de cada inspección.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Gestión de Equipos</CardTitle>
                <CardDescription>
                  Asigna inspecciones a tu equipo, controla permisos y mantén la
                  colaboración fluida entre todos los miembros.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Geolocalización</CardTitle>
                <CardDescription>
                  Registra la ubicación exacta de cada inspección con mapas
                  interactivos y coordenadas GPS precisas.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Seguridad Total</CardTitle>
                <CardDescription>
                  Protege tus datos con encriptación de nivel empresarial y
                  cumple con todas las normativas de seguridad.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Programación</CardTitle>
                <CardDescription>
                  Programa inspecciones automáticas, establece recordatorios y
                  mantén un calendario organizado de todas tus actividades.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>;
}
