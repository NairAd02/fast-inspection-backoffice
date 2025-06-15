import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { List, PlusIcon, X } from "lucide-react";
import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface Props {
  index: number;
}

export default function RHFStackSelectionDefinedField({ index }: Props) {
  const { control } = useFormContext();
  const {
    fields: optionsFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `camposDefinidosSeleccion.${index}.opciones`,
  });
  const handleAddItem = useCallback(() => {
    append({ nombre: "" });
  }, [append]);
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <List className="h-4 w-4 text-purple-500" />
          <span className="font-medium">Campo de Selección</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <RHFTextField
          name={`camposDefinidosSeleccion.${index}.nombre`}
          label="Nombre del Campo Definido"
          placeholder="Introduzca el nombre del campo definido"
          fullWidth
        />
        <div className="space-y-2">
          <Label>Opciones</Label>
          <div className="space-y-2">
            {optionsFields.map((_, indexOption) => (
              <div key={indexOption} className="flex items-center space-x-2">
                <RHFTextField
                  name={`camposDefinidosSeleccion.${index}.opciones.${indexOption}.nombre`}
                  placeholder={`Introduzca el nombre de la opción`}
                  fullWidth
                />
                <Button
                  size="sm"
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => {
              handleAddItem();
            }}
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Agregar Opción
          </Button>
        </div>
      </div>
    </div>
  );
}
