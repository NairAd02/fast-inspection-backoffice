import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Star } from "lucide-react";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { paths } from "@/routes/path";

export default function HomeHeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <Badge variant="default" className="mb-4">
          <Star className="w-4 h-4 mr-1" />
          Plataforma Líder en Inspecciones
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Gestiona Inspecciones de{" "}
          <span className="text-primary">Edificaciones</span> de Forma
          Inteligente
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Simplifica la administración y visualización de inspecciones técnicas.
          Genera reportes profesionales, configura la metodología y mantén el
          control total de las edificaciones.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NavigationComponent href={paths.configs.root}>
            <Button size="lg" className="text-lg px-8 py-3">
              Comenzar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </NavigationComponent>
        </div>
        <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-700 mr-2" />
            Sin tarjeta de crédito
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-700 mr-2" />
            Configuración en 5 minutos
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-700 mr-2" />
            Soporte 24/7
          </div>
        </div>
      </div>
    </section>
  );
}
