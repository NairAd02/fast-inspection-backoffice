import { ToolsFilters } from "@/sections/tools/filters/hooks/use-tools-filters";

export interface Tool {
  id: number;
  nombre: string;
  tipo: TipoHerramienta;
}

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
