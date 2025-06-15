export interface DefinedField {
  id: string;
  nombre: string;
  tipo: DefinedFieldTypes;
}

export interface DefinedFieldCreateDTO {
  nombre: string;
  tipo: DefinedFieldTypes;
}

/* Numeric Defined Field */

export interface NumericDefinedField extends DefinedField {
  inicioIntervalo: number;
  finalIntervalo: number;
  unidadMedida: string;
}

export interface NumericDefinedFieldCreateDTO extends DefinedFieldCreateDTO {
  inicioIntervalo: number;
  finalIntervalo: number;
  unidadMedida: string;
}

/* Selection Defined Field */

export interface SelectionDefinedField extends DefinedField {
  opciones: string[];
}

export interface SelectionDefinedFieldCreateDTO extends DefinedFieldCreateDTO {
  opciones: string[];
}

export enum DefinedFieldTypes {
  IMAGE = "CampoDefinidoImagen",
  TEXT = "CampoDefinidoTexto",
  NUMERIC = "CampoDefinidoNumerico",
  SELECTION = "CampoDefinidoSeleccion",
}

// Get field type display name
export const getFieldTypeDisplayName = (type: DefinedFieldTypes) => {
  switch (type) {
    case DefinedFieldTypes.IMAGE:
      return "Imagen";
    case DefinedFieldTypes.TEXT:
      return "Texto";
    case DefinedFieldTypes.NUMERIC:
      return "Numérico";
    case DefinedFieldTypes.SELECTION:
      return "Selección";
    default:
      return "Desconocido";
  }
};
