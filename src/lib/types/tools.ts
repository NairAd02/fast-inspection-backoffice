import { ToolsFilters } from "@/sections/tools/filters/hooks/use-tools-filters";
import {
  convertFieldCreateDTO,
  Field,
  FieldCreateDTO,
  FieldEditDTO,
} from "./fields";
import { ToolCreate } from "@/sections/tools/form/new/schemas/tool-create-schema";
import { ToolEdit } from "@/sections/tools/form/edit/schemas/tool-edit-schema";

export interface Tool {
  id: number;
  nombre: string;
  tipo: TipoHerramienta;
}

export interface ToolDetails {
  id: number;
  nombre: string;
  tipo: TipoHerramienta;
  campos: Field[];
}

export interface ToolCreateDTO {
  nombre: string;
  campos: FieldCreateDTO[];
  config: {
    version: string;
  };
}

export interface ToolEditDTO {
  nombre: string;
  campos: FieldEditDTO[];
}

export const convertToolCreateDTO = (
  toolCreate: ToolCreate,
  configVersion: string
): ToolCreateDTO => {
  return {
    ...toolCreate,
    config: { version: configVersion },
    campos: toolCreate.campos.map((field) =>
      convertFieldCreateDTO(field, configVersion)
    ),
  };
};

export const convertToolEditDTO = (toolEdit: ToolEdit): ToolEditDTO => {
  return {
    ...toolEdit,
  };
};

export interface ToolsFiltersDTO {
  nombre?: string;
}

export const convertToolsFiltersDTO = (
  filters: ToolsFilters
): ToolsFiltersDTO => {
  return {
    ...filters,
  };
};

export enum TipoHerramienta {
  AnalisisCriticidad = "herramientaAnalisisCriticidad",
}

export const toolsTypeMap: Map<
  TipoHerramienta,
  {
    name: string;
    color:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning";
  }
> = new Map([
  [
    TipoHerramienta.AnalisisCriticidad,
    { name: "Análisis de Criticidad", color: "primary" },
  ],
]);

export const averageImportance = (tool: ToolDetails) =>
  tool.campos.length > 0
    ? Math.round(
        (tool.campos.reduce((sum, field) => sum + field.nivelImportancia, 0) /
          tool.campos.length) *
          10
      ) / 10
    : 0;

export const highImportanceFields = (tool: ToolDetails) =>
  tool.campos.filter((field) => field.nivelImportancia >= 7).length;

export const criticalFields = (tool: ToolDetails) =>
  tool.campos.filter((field) => field.nivelImportancia >= 9).length;
