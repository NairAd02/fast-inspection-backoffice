import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardCheck,
  BarChart3,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Calendar,
  MapPin,
} from "lucide-react";

export default function HomeContainer() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            <Star className="w-4 h-4 mr-1" />
            Plataforma Líder en Inspecciones
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Gestiona Inspecciones de{" "}
            <span className="text-blue-600">Edificaciones</span> de Forma
            Inteligente
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Simplifica la administración y visualización de inspecciones
            técnicas. Genera reportes profesionales, gestiona equipos y mantén
            el control total de tus proyectos de construcción.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3">
              Comenzar Prueba Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Ver Demo en Vivo
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Sin tarjeta de crédito
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Configuración en 5 minutos
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Soporte 24/7
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cómo funciona en 3 simples pasos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desde la configuración hasta la generación de reportes, nuestro
              proceso está diseñado para ser intuitivo y eficiente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Configura tu Proyecto
              </h3>
              <p className="text-gray-600">
                Crea tu proyecto, define los tipos de inspección y configura los
                formularios según tus necesidades específicas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Realiza Inspecciones
              </h3>
              <p className="text-gray-600">
                Utiliza nuestra app móvil o web para realizar inspecciones en
                campo, capturar fotos y completar formularios detallados.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Genera Reportes</h3>
              <p className="text-gray-600">
                Obtén reportes profesionales automáticamente, compártelos con
                clientes y mantén un historial completo de todas las
                inspecciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para transformar tus inspecciones?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Únete a cientos de profesionales que ya confían en nuestra
            plataforma para gestionar sus inspecciones de manera más eficiente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Comenzar Prueba Gratuita de 14 Días
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
            >
              Hablar con Ventas
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
