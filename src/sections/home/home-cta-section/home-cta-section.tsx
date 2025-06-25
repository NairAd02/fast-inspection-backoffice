import NavigationComponent from "@/components/navigation-component/navigation-component";
import { Button } from "@/components/ui/button";
import { paths } from "@/routes/path";
import React from "react";

export default function HomeCtaSection() {
  return (
    <section className="py-20 px-4 bg-primary ">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          ¿Listo para transformar tus inspecciones?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-white">
          Únete a cientos de profesionales que ya confían en nuestra plataforma
          para gestionar sus inspecciones de manera más eficiente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NavigationComponent href={paths.configs.root}>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Comenzar
            </Button>
          </NavigationComponent>
        </div>
      </div>
    </section>
  );
}
