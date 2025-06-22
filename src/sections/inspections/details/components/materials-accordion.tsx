"use client";


import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';


import { Hammer, Box } from 'lucide-react';
import { InspectionMaterial } from '@/lib/types/inspection-materials';
import { CriticalityBadge } from './criticality-badge';
import { DeteriorationTypesAccordion } from './deterioration-types-accordion';

interface MaterialsAccordionProps {
  materials: InspectionMaterial[];
}

export function MaterialsAccordion({ materials }: MaterialsAccordionProps) {
  return (
    <div className="border-l-2 border-green-200 pl-4 mt-3">
      <div className="flex items-center gap-2 mb-3">
        <Hammer className="h-4 w-4 text-green-600" />
        <span className="font-medium text-gray-900">Materiales ({materials.length})</span>
      </div>
      
      <Accordion type="multiple" className="space-y-3">
        {materials.map((material) => (
          <AccordionItem key={material._id} value={material._id} className="border rounded-lg bg-green-50/30">
            <AccordionTrigger className="px-3 py-2 hover:no-underline">
              <div className="flex items-center justify-between w-full mr-4">
                <div className="flex items-center gap-2">
                  <Box className="h-3 w-3 text-green-600" />
                  <div className="text-left">
                    <span className="font-medium text-sm">{material.nombre}</span>
                    <span className="text-xs text-gray-500 ml-2">({material.id})</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CriticalityBadge value={material.indiceCriticidad} className="text-xs" />
                  <Badge variant="outline" className="text-xs bg-white">
                    {material.cantDeterioros} deterioros
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3">
              {material.tiposDeterioros.length > 0 && (
                <DeteriorationTypesAccordion deteriorationTypes={material.tiposDeterioros} />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}