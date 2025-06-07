import { Button } from "@/components/ui/button";
import React from "react";

export default function HomeCtaSection() {
  return (
    <section className="py-20 px-4 bg-blue-600 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          ¿Listo para transformar tus inspecciones?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Únete a cientos de profesionales que ya confían en nuestra plataforma
          para gestionar sus inspecciones de manera más eficiente.
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
  );
}
