import { ToolsFilters } from "@/sections/tools/filters/hooks/use-tools-filters";

export interface Tool {
  id: number;
  nombre: string;
  tipo: string;
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
