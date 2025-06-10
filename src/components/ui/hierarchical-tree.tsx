"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Tipos base para el Tree jerárquico
export interface TreeAction<T = any> {
  icon: React.ReactNode
  label: string
  onClick: (item: HierarchicalTreeData<T>) => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export interface HierarchicalTreeData<T = any> {
  id: string
  type: string // Tipo de entidad (sistema, subsistema, material, etc.)
  data: T
  children?: HierarchicalTreeData<any>[] // Los hijos pueden ser de cualquier tipo
  // Componente específico para este item (opcional)
  contentComponent?: React.ComponentType<{ data: T; item: HierarchicalTreeData<T> }>
  // Acciones específicas para este item (opcional)
  actions?: TreeAction<T>[]
}

export interface TreeItemProps<T = any> {
  item: HierarchicalTreeData<T>
  defaultContentComponent?: React.ComponentType<{ data: any; item: HierarchicalTreeData<any> }>
  defaultActions?: TreeAction<any>[]
  level?: number
  onToggle?: (id: string, expanded: boolean) => void
  expandedItems?: Set<string>
  // Mapa de componentes por tipo
  componentMap?: Record<string, React.ComponentType<{ data: any; item: HierarchicalTreeData<any> }>>
  // Mapa de acciones por tipo
  actionsMap?: Record<string, TreeAction<any>[]>
}

export interface HierarchicalTreeProps {
  data: HierarchicalTreeData<any>[]
  // Componente por defecto (fallback)
  defaultContentComponent?: React.ComponentType<{ data: any; item: HierarchicalTreeData<any> }>
  // Acciones por defecto (fallback)
  defaultActions?: TreeAction<any>[]
  // Mapa de componentes por tipo de entidad
  componentMap?: Record<string, React.ComponentType<{ data: any; item: HierarchicalTreeData<any> }>>
  // Mapa de acciones por tipo de entidad
  actionsMap?: Record<string, TreeAction<any>[]>
  defaultExpanded?: boolean
}

// Componente TreeItem individual
function HierarchicalTreeItem({
  item,
  defaultContentComponent,
  defaultActions = [],
  level = 0,
  onToggle,
  expandedItems,
  componentMap = {},
  actionsMap = {},
}: TreeItemProps) {
  const hasChildren = item.children && item.children.length > 0
  const isExpanded = expandedItems?.has(item.id) || false
  const paddingLeft = level * 24

  // Determinar qué componente usar (prioridad: item específico > mapa por tipo > por defecto)
  const ContentComponent = item.contentComponent || componentMap[item.type] || defaultContentComponent

  // Determinar qué acciones usar (prioridad: item específico > mapa por tipo > por defecto)
  const actions = item.actions || actionsMap[item.type] || defaultActions

  const handleToggle = () => {
    if (hasChildren && onToggle) {
      onToggle(item.id, !isExpanded)
    }
  }

  if (!ContentComponent) {
    console.warn(`No ContentComponent found for item type: ${item.type}`)
    return null
  }

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
        <div className="flex-1 min-w-0">
          <ContentComponent data={item.data} item={item} />
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "ghost"}
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => action.onClick(item)}
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
              defaultContentComponent={defaultContentComponent}
              defaultActions={defaultActions}
              level={level + 1}
              onToggle={onToggle}
              expandedItems={expandedItems}
              componentMap={componentMap}
              actionsMap={actionsMap}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Componente Tree principal
export function HierarchicalTree({
  data,
  defaultContentComponent,
  defaultActions = [],
  componentMap = {},
  actionsMap = {},
  defaultExpanded = false,
}: HierarchicalTreeProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    if (defaultExpanded) {
      const getAllIds = (items: HierarchicalTreeData<any>[]): string[] => {
        const ids: string[] = []
        items.forEach((item) => {
          ids.push(item.id)
          if (item.children) {
            ids.push(...getAllIds(item.children))
          }
        })
        return ids
      }
      return new Set(getAllIds(data))
    }
    return new Set<string>()
  })

  const handleToggle = (id: string, expanded: boolean) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (expanded) {
        newSet.add(id)
      } else {
        newSet.delete(id)
      }
      return newSet
    })
  }

  return (
    <div className="w-full border rounded-lg bg-background">
      {data.map((item) => (
        <HierarchicalTreeItem
          key={item.id}
          item={item}
          defaultContentComponent={defaultContentComponent}
          defaultActions={defaultActions}
          onToggle={handleToggle}
          expandedItems={expandedItems}
          componentMap={componentMap}
          actionsMap={actionsMap}
        />
      ))}
    </div>
  )
}
