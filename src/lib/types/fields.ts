import { FieldCreate } from "@/sections/tools/form/new/schemas/field-create-schema";

export interface Field {
  id: number;
  nombre: string;
  nivelImportancia: number;
}

export interface FieldCreateDTO {
  nombre: String;
  nivelImportancia: number;
  configVersion: string;
}

export const convertFieldCreateDTO = (
  fieldCreate: FieldCreate,
  configVersion: string
): FieldCreateDTO => {
  return {
    ...fieldCreate,
    configVersion,
  };
};

// Get importance level badge variant
export const getImportanceBadgeVariant = (level: number) => {
  if (level >= 8) return "destructive";
  if (level >= 6) return "secondary";
  if (level >= 4) return "outline";
  return "success";
};
