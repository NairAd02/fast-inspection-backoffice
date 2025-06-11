"use client";

import type React from "react";
import { ReactNode, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Tipos base para el Tree jerárquico
export interface TreeAction {
  icon: React.ReactNode;
  label: string;
  onClick: (id: string) => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export interface TreeItem {
  id: string;
  dataId: string
  content: ReactNode;
  actions: TreeAction[];
  children?: TreeItem[];
}

export interface TreeItemProps {
  item: TreeItem;
  level?: number;
  onToggle?: (id: string, expanded: boolean) => void;
  expandedItems?: Set<string>;
}

export interface HierarchicalTreeProps {
  data: TreeItem[];

  defaultExpanded?: boolean;
}

// Componente TreeItem individual
function HierarchicalTreeItem({
  item,
  level = 0,
  onToggle,
  expandedItems,
}: TreeItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems?.has(item.id) || false;
  const paddingLeft = level * 24;

  // Determinar qué componente usar (prioridad: item específico > mapa por tipo > por defecto)
  const ContentComponent = item.content;

  // Determinar qué acciones usar (prioridad: item específico > mapa por tipo > por defecto)
  const actions = item.actions;

  const handleToggle = () => {
    if (hasChildren && onToggle) {
      onToggle(item.id, !isExpanded);
    }
  };

  return (
    <div className="w-full">
      {/* Item principal */}
      <div
        className="flex items-center gap-2 py-2 px-2 hover:bg-muted/50 rounded-md group"
        style={{ paddingLeft: `${paddingLeft + 8}px` }}
      >
        {/* Botón de expandir/colapsar */}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-muted"
          onClick={handleToggle}
          disabled={!hasChildren}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          ) : (
            <div className="h-4 w-4" />
          )}
        </Button>

        {/* Contenido personalizado */}
        <div className="flex-1 min-w-0">{ContentComponent}</div>

        {/* Acciones */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "ghost"}
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => action.onClick(item.dataId)}
              title={action.label}
            >
              {action.icon}
            </Button>
          ))}
        </div>
      </div>

      {/* Hijos (renderizado recursivo) */}
      {hasChildren && isExpanded && (
        <div className="ml-2">
          {item.children!.map((child) => (
            <HierarchicalTreeItem
              key={child.id}
              item={child}
              level={level + 1}
              onToggle={onToggle}
              expandedItems={expandedItems}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Componente Tree principal
export function HierarchicalTree({
  data,
  defaultExpanded = false,
}: HierarchicalTreeProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    if (defaultExpanded) {
      const getAllIds = (items: TreeItem[]): string[] => {
        const ids: string[] = [];
        items.forEach((item) => {
          ids.push(item.id);
          if (item.children) {
            ids.push(...getAllIds(item.children));
          }
        });
        return ids;
      };
      return new Set(getAllIds(data));
    }
    return new Set<string>();
  });

  const handleToggle = (id: string, expanded: boolean) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (expanded) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full border rounded-lg bg-background">
      {data.map((item) => (
        <HierarchicalTreeItem
          key={item.id}
          item={item}
          onToggle={handleToggle}
          expandedItems={expandedItems}
        />
      ))}
    </div>
  );
}
