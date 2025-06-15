import { DeteriorationTypeCreate } from "@/sections/deterioration-types/form/new/schemas/deterioration-type-create-schema";
import { CauseCreateDTO } from "./causes";
import { DefinedFieldCreateDTO } from "./defined-fields";

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
  cantCamposAfectados: number;
  cantCausas: number;
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
    camposAfectados: deteriorationTypeCreate.camposAfectados.map(
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
