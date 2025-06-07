import StepCard from "@/components/step-card/step-card";
import React from "react";

export default function HomeProcessSection() {
  return (
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
          <StepCard
            step="1"
            title="Configura tu Proyecto"
            description="Crea tu proyecto, define los tipos de inspección y configura los
              formularios según tus necesidades específicas."
          />
          <StepCard
            step="2"
            title="Realiza Inspecciones"
            description="Utiliza nuestra app móvil o web para realizar inspecciones en campo,
                capturar fotos y completar formularios detallados."
          />

          <StepCard
            step="3"
            title="Genera Reportes"
            description="Obtén reportes profesionales automáticamente, compártelos con
              clientes y mantén un historial completo de todas las inspecciones."
          />
        </div>
      </div>
    </section>
  );
}
