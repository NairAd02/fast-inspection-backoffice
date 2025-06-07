import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Star } from "lucide-react";

export default function HomeHeroSection() {
  return (
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
          Simplifica la administración y visualización de inspecciones técnicas.
          Genera reportes profesionales, gestiona equipos y mantén el control
          total de tus proyectos de construcción.
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
  );
}
