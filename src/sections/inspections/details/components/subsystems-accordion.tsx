"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Component, Package } from "lucide-react";
import { CriticalityBadge } from "./criticality-badge";
import { MaterialsAccordion } from "./materials-accordion";
import { InspectionSubsystem } from "@/lib/types/inspection-subsystems";

interface SubsystemsAccordionProps {
  subsystems: InspectionSubsystem[];
}

export function SubsystemsAccordion({ subsystems }: SubsystemsAccordionProps) {
  return (
    <div className="border-l-2 border-blue-200 pl-4">
      <div className="flex items-center gap-2 mb-3">
        <Component className="h-4 w-4 text-blue-600" />
        <span className="font-medium text-gray-900">
          Subsistemas ({subsystems.length})
        </span>
      </div>

      <Accordion type="multiple" className="space-y-3">
        {subsystems.map((subsystem) => (
          <AccordionItem
            key={subsystem._id}
            value={subsystem._id}
            className="border rounded-lg bg-blue-50/30"
          >
            <AccordionTrigger className="px-3 py-2 hover:no-underline">
              <div className="flex items-center justify-between w-full mr-4">
                <div className="flex items-center gap-2">
                  <Package className="h-3 w-3 text-blue-600" />
                  <span className="font-medium text-sm text-left">
                    {subsystem.nombre}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CriticalityBadge
                    value={subsystem.indiceCriticidad}
                    className="text-xs"
                  />
                  <Badge variant="outline" className="text-xs bg-white">
                    {subsystem.cantDeterioros} deterioros
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3">
              {subsystem.materiales.length > 0 && (
                <MaterialsAccordion materials={subsystem.materiales} />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
