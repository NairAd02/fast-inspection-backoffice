import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TextDefinedFieldCreate } from "../../new/schemas/text-defined-field-create-schema";
import { DefinedFieldTypes } from "@/lib/types/defined-fields";
import { NumericDefinedFieldCreate } from "../../new/schemas/numeric-defined-field-create-schema";
import { ImageDefinedFieldCreate } from "../../new/schemas/image-defined-field-create-schema";
import { SelectionDefinedFieldCreate } from "../../new/schemas/selection-defined-field-create-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PopoverContainer from "@/components/ui/popover-container";
import { Button } from "@/components/ui/button";
import RHFStackTextDefinedField from "../rhf-stack-text-defined-field/rhf-stack-text-defined-field";
import RHFStackImageDefinedField from "../rhf-stack-image-defined-field/rhf-stack-image-defined-field";
import RHFStackNumericDefinedField from "../rhf-stack-numeric-defined-field/rhf-stack-numeric-defined-field";
import RHFStackSelectionDefinedField from "../rhf-stack-selection-defined-field/rhf-stack-selection-defined-field";
import {
  AlertCircleIcon,
  HashIcon,
  ImageIcon,
  ListIcon,
  TypeIcon,
} from "lucide-react";
import { DeleteMask } from "@/components/delete-mask/delete-mask";

export default function RHFDefinedFields() {
  const newTextDefinedField: TextDefinedFieldCreate = {
    nombre: "",
    tipo: DefinedFieldTypes.TEXT,
  };

  const newNumericDefinedField: NumericDefinedFieldCreate = {
    nombre: "",
    inicioIntervalo: 1,
    finalIntervalo: 1000,
    unidadMedida: "",
    tipo: DefinedFieldTypes.NUMERIC,
  };

  const newImageDefinedField: ImageDefinedFieldCreate = {
    nombre: "",
    tipo: DefinedFieldTypes.IMAGE,
  };

  const newSelectionDefinedField: SelectionDefinedFieldCreate = {
    nombre: "",
    tipo: DefinedFieldTypes.SELECTION,
    opciones: [],
  };

  const { control } = useFormContext();
  const {
    fields: textDefinedFields,
    append: appendTextDefinedField,
    remove: removeTextDefinedField,
  } = useFieldArray({
    control,
    name: "camposDefinidosTexto",
  });

  const {
    fields: numericDefinedFields,
    append: appendNumericDefinedField,
    remove: removeNumericDefinedField,
  } = useFieldArray({
    control,
    name: "camposDefinidosNumericos",
  });

  const {
    fields: imageDefinedFields,
    append: appendImageDefinedField,
    remove: removeImageDefinedField,
  } = useFieldArray({
    control,
    name: "camposDefinidosImagen",
  });

  const {
    fields: selectionDefinedFields,
    append: appendSelectionDefinedField,
    remove: removeSelectionDefinedField,
  } = useFieldArray({
    control,
    name: "camposDefinidosSeleccion",
  });
  console.log(selectionDefinedFields);
  const handleAddTextDefinedField = useCallback(() => {
    appendTextDefinedField(newTextDefinedField);
  }, [appendTextDefinedField, newTextDefinedField]);

  const handleAddImageDefinedField = useCallback(() => {
    appendImageDefinedField(newImageDefinedField);
  }, [appendImageDefinedField, newImageDefinedField]);

  const handleAddSelectionDefinedField = useCallback(() => {
    appendSelectionDefinedField(newSelectionDefinedField);
  }, [appendSelectionDefinedField, newSelectionDefinedField]);

  const handleAddNumericDefinedField = useCallback(() => {
    appendNumericDefinedField(newNumericDefinedField);
  }, [appendNumericDefinedField, newNumericDefinedField]);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center justify-between">
          Campos Definidos
          <PopoverContainer trigger={<Button>Agregar Campo Definido</Button>}>
            <div className="flex flex-col gap-2">
              <Button type="button" onClick={handleAddTextDefinedField}>
                <TypeIcon className="h-4 w-4 mr-2" />
                Campo de Texto
              </Button>
              <Button type="button" onClick={handleAddImageDefinedField}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Campo de Imagen
              </Button>
              <Button type="button" onClick={handleAddSelectionDefinedField}>
                <ListIcon className="h-4 w-4 mr-2" />
                Campo de Selección
              </Button>
              <Button type="button" onClick={handleAddNumericDefinedField}>
                <HashIcon className="h-4 w-4 mr-2" />
                Campo Numérico
              </Button>
            </div>
          </PopoverContainer>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <p>Campos de Texto</p>
            {textDefinedFields.length > 0 ? (
              textDefinedFields.map((textDefinedField, index) => (
                <DeleteMask
                  key={textDefinedField.id}
                  onDelete={() => {
                    removeTextDefinedField(index);
                  }}
                >
                  <RHFStackTextDefinedField index={index} />
                </DeleteMask>
              ))
            ) : (
              <div className="flex justify-center items-center gap-2">
                {" "}
                <AlertCircleIcon /> No se han insertado campos de texto
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p>Campos de Imagen</p>
            {imageDefinedFields.length > 0 ? (
              imageDefinedFields.map((imageDefinedField, index) => (
                <DeleteMask
                  key={imageDefinedField.id}
                  onDelete={() => {
                    removeImageDefinedField(index);
                  }}
                >
                  {" "}
                  <RHFStackImageDefinedField index={index} />
                </DeleteMask>
              ))
            ) : (
              <div className="flex justify-center items-center gap-2">
                {" "}
                <AlertCircleIcon /> No se han insertado campos de imagen
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p>Campos de Númericos</p>
            {numericDefinedFields.length > 0 ? (
              numericDefinedFields.map((numericDefinedField, index) => (
                <DeleteMask
                  key={numericDefinedField.id}
                  onDelete={() => {
                    removeNumericDefinedField(index);
                  }}
                >
                  <RHFStackNumericDefinedField index={index} />
                </DeleteMask>
              ))
            ) : (
              <div className="flex justify-center items-center gap-2">
                {" "}
                <AlertCircleIcon /> No se han insertado campos numéricos
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p>Campos de Selección</p>
            {selectionDefinedFields.length > 0 ? (
              selectionDefinedFields.map((selectionDefinedField, index) => (
                <DeleteMask
                  key={selectionDefinedField.id}
                  onDelete={() => {
                    removeSelectionDefinedField(index);
                  }}
                >
                  <RHFStackSelectionDefinedField index={index} />
                </DeleteMask>
              ))
            ) : (
              <div className="flex justify-center items-center gap-2">
                {" "}
                <AlertCircleIcon /> No se han insertado campos de selección
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
