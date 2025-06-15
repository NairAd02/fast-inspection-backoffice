import { DeteriorationTypeCreate } from "@/sections/deterioration-types/form/new/schemas/deterioration-type-create-schema";
import { Cause, CauseCreateDTO } from "./causes";
import { DefinedField, DefinedFieldCreateDTO } from "./defined-fields";
import { Field } from "./fields";
import { DeteriorationTypeEdit } from "@/sections/deterioration-types/form/edit/schemas/deterioration-type-edit-schema";

export interface DeteriorationType {
  id: number;
  nombre: string;
  detectabilidad: number;
  cantCamposAfectados: number;
  cantCausas: number;
}

export interface DeteriorationTypeDetails {
  id: number;
  nombre: string;
  detectabilidad: number;
  camposAfectados: Field[];
  cantCamposAfectados: number;
  cantCausas: number;
  camposDefinidos: DefinedField[];
  causas: Cause[];
}

export interface DeteriorationTypeCreateDTO {
  nombre: string;
  detectabilidad: number;
  camposDefinidos: DefinedFieldCreateDTO[];
  causas: CauseCreateDTO[];
  materialConfig: {
    id: string;
  };
  camposAfectados: { id: string }[];
}

export interface DeteriorationTypeEditDTO {
  nombre: string;
  detectabilidad: number;
  camposDefinidos: DefinedFieldCreateDTO[];
  causas: CauseCreateDTO[];
  camposAfectados: { id: string }[];
}

export const convertDeteriorationTypeCreateDTO = (
  deteriorationTypeCreate: DeteriorationTypeCreate,
  materialId: string
): DeteriorationTypeCreateDTO => {
  const {
    camposDefinidosImagen,
    camposDefinidosNumericos,
    camposDefinidosSeleccion,
    camposDefinidosTexto,
    ...rest
  } = deteriorationTypeCreate;
  return {
    ...rest,
    camposAfectados: rest.camposAfectados.map(
      (affectedField) => ({ id: affectedField })
    ),
    camposDefinidos: [
      ...camposDefinidosTexto,
      ...camposDefinidosImagen,
      ...camposDefinidosNumericos,
      ...camposDefinidosSeleccion.map((selectionDefinedField) => ({
        ...selectionDefinedField,
        opciones: selectionDefinedField.opciones.map((option) => option.nombre),
      })),
    ],
    materialConfig: { id: materialId },
  };
};

export const convertDeteriorationTypeEditDTO = (
  deteriorationTypeEdit: DeteriorationTypeEdit
): DeteriorationTypeEditDTO => {
  const {
    camposDefinidosImagen,
    camposDefinidosNumericos,
    camposDefinidosSeleccion,
    camposDefinidosTexto,
    ...rest
  } = deteriorationTypeEdit;
  return {
    ...rest,
    camposAfectados: rest.camposAfectados.map((affectedField) => ({
      id: affectedField,
    })),
    camposDefinidos: [
      ...camposDefinidosTexto,
      ...camposDefinidosImagen,
      ...camposDefinidosNumericos,
      ...camposDefinidosSeleccion.map((selectionDefinedField) => ({
        ...selectionDefinedField,
        opciones: selectionDefinedField.opciones.map((option) => option.nombre),
      })),
    ],
  };
};
