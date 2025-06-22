"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { Cpu, Wrench, Layers } from "lucide-react";
import { InspectionSystem } from "@/lib/types/inspection-systems";
import { CriticalityBadge } from "./criticality-badge";
import { SubsystemsAccordion } from "./subsystems-accordion";

interface SystemsAccordionProps {
  systems: InspectionSystem[];
}

export function SystemsAccordion({ systems }: SystemsAccordionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-blue-600" />
          Sistemas de Inspección ({systems.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="space-y-4">
          {systems.map((system) => (
            <AccordionItem
              key={system._id}
              value={system._id}
              className="border rounded-lg"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center gap-3">
                    <Layers className="h-4 w-4 text-indigo-600" />
                    <span className="font-semibold text-left">
                      {system.nombre}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CriticalityBadge value={system.indiceCriticidad} />
                    <Badge variant="outline" className="bg-blue-50">
                      {system.cantDeterioros} deterioros
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  {/* Tool Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="h-4 w-4 text-gray-600" />
                      <span className="font-medium text-gray-900">
                        Herramienta de Análisis
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Nombre
                        </p>
                        <p className="font-semibold">
                          {system.herramienta.nombre}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Tipo
                        </p>
                        <Badge variant="outline">
                          {system.herramienta.tipo}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Criticality Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Índice de Criticidad
                      </span>
                      <span className="text-sm text-gray-600">
                        {system.indiceCriticidad}%
                      </span>
                    </div>
                    <Progress value={system.indiceCriticidad} className="h-2" />
                  </div>

                  {/* Subsystems */}
                  {system.subsistemas.length > 0 && (
                    <SubsystemsAccordion subsystems={system.subsistemas} />
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
