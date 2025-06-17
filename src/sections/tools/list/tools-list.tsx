"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { Tool, toolsTypeMap } from "@/lib/types/tools";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";
import useTools from "../hooks/use-tools";
import ToolsFiltersContainer from "../filters/tools-filters-container";
import { modalTypes } from "@/components/modal/types/modalTypes";

interface Props {
  configVersion: string;
}

export default function ToolsList({ configVersion }: Props) {
  const {
    tools,
    loadingData: loadingDataTools,
    filters,
    fetchTools,
  } = useTools({
    defaultsFilters: {
      versionConfig: configVersion,
    },
  });
  const { handleOpenModal } = useContext(ModalContext);

  const handleCreate = useCallback(() => {
    handleOpenModal({
      name: modalTypes.newToolModal.name,
      entity: configVersion,
      actionExecute: fetchTools,
    });
  }, [handleOpenModal, configVersion, fetchTools]);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.editToolModal.name,
        entity: id,
        actionExecute: fetchTools,
      });
    },
    [handleOpenModal, fetchTools]
  );

  const handleViewDetails = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.detailsToolModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const handleDelete = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.deleteToolModal.name,
        entity: id,
        actionExecute: fetchTools,
      });
    },
    [handleOpenModal, fetchTools]
  );

  const columns: ColumnDef<Tool>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      cell: ({ row }) => (
        <Badge
          variant={toolsTypeMap.get(row.getValue("tipo"))?.color as "default"}
        >
          {toolsTypeMap.get(row.getValue("tipo"))?.name as string}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <TableMenu
              titleTableMenu="Acciones"
              actions={[
                {
                  label: "Ver Detalles",
                  icon: <EyeIcon />,
                  action: () => {
                    handleViewDetails(row.getValue("id"));
                  },
                },
                {
                  label: "Editar",
                  icon: <EditIcon />,
                  action: () => {
                    handleEdit(row.getValue("id"));
                  },
                },
                {
                  label: "Eliminar",
                  icon: <Trash2Icon />,
                  action: () => {
                    handleDelete(row.getValue("id"));
                  },
                },
              ]}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={columns}
        data={tools}
        isLoading={loadingDataTools}
        initialVisibilityState={{ id: false }}
        filters={
          <ToolsFiltersContainer
            filters={filters.filters}
            getActiveFiltersCount={filters.getActiveFiltersCount}
            handleChangeFilters={filters.handleChangeFilters}
            handleResetFilters={filters.handleResetFilters}
          />
        }
        addButton={{
          buttonText: "Crear Herramienta",
          action: handleCreate,
        }}
      />
    </div>
  );
}
