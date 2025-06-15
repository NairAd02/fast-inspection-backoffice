import { RHFNumberField } from "@/components/form/rhf-components/rhf-number-field/rhf-number-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function DeteriorationTypeFormBasicInformation() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Información Básica</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <RHFTextField
            name="nombre"
            label="Nombre"
            placeholder="Introduzca el nombre del tipo de deterioro"
            fullWidth
          />
          <RHFNumberField
            name="detectabilidad"
            label="Detectabilidad"
            fullWidth
          />
        </div>
      </CardContent>
    </Card>
  );
}
