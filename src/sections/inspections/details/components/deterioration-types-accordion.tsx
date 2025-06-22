"use client";


import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Target, Eye, Shield } from 'lucide-react';
import { DeteriorationCard } from './deterioration-card';
import { InspectionDeteriorationType } from '@/lib/types/inspection-deterioration-types';
import { CriticalityBadge } from './criticality-badge';

interface DeteriorationTypesAccordionProps {
  deteriorationTypes: InspectionDeteriorationType[];
}

export function DeteriorationTypesAccordion({ deteriorationTypes }: DeteriorationTypesAccordionProps) {
  return (
    <div className="border-l-2 border-orange-200 pl-4 mt-3">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <span className="font-medium text-gray-900">Tipos de Deterioro ({deteriorationTypes.length})</span>
      </div>
      
      <Accordion type="multiple" className="space-y-3">
        {deteriorationTypes.map((deteriorationType) => (
          <AccordionItem key={deteriorationType._id} value={deteriorationType._id} className="border rounded-lg bg-orange-50/30">
            <AccordionTrigger className="px-3 py-2 hover:no-underline">
              <div className="flex items-center justify-between w-full mr-4">
                <div className="flex items-center gap-2">
                  <Target className="h-3 w-3 text-orange-600" />
                  <span className="font-medium text-sm text-left">{deteriorationType.nombre}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CriticalityBadge value={deteriorationType.indiceCriticidad.valor} className="text-xs" />
                  <Badge variant="outline" className="text-xs bg-white">
                    {deteriorationType.cantDeterioros} casos
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3">
              <div className="space-y-4">
                {/* Criticality and Detectability Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-red-600" />
                      <span className="font-medium text-sm">Criticidad</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {deteriorationType.indiceCriticidad.nombre} ({deteriorationType.indiceCriticidad.valor}%)
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-sm">Detectabilidad</span>
                    </div>
                    <p className="text-sm text-gray-600">{deteriorationType.detectabilidad}%</p>
                  </div>
                </div>

                {/* Affected Fields */}
                {deteriorationType.camposAfectados.length > 0 && (
                  <div className="bg-white rounded-lg p-3 border">
                    <h4 className="font-medium text-sm mb-2">Campos Afectados</h4>
                    <div className="space-y-2">
                      {deteriorationType.camposAfectados.map((field) => (
                        <div key={field._id} className="flex items-center justify-between text-sm">
                          <span>{field.nombre}</span>
                          <Badge variant="outline" className="text-xs">
                            Importancia: {field.nivelImportancia}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deteriorations */}
                {deteriorationType.deterioros.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Deterioros Registrados</h4>
                    {deteriorationType.deterioros.map((deterioration) => (
                      <DeteriorationCard key={deterioration._id} deterioration={deterioration} />
                    ))}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}