import { ToolsFilters } from "@/sections/tools/filters/hooks/use-tools-filters";
import { convertFieldCreateDTO, FieldCreateDTO, FieldEditDTO } from "./fields";
import { ToolCreate } from "@/sections/tools/form/new/schemas/tool-create-schema";
import { ToolEdit } from "@/sections/tools/form/edit/schemas/tool-edit-schema";

export interface Tool {
  id: number;
  nombre: string;
  tipo: TipoHerramienta;
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
