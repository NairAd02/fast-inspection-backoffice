"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";
import { modalTypes } from "@/components/modal/types/modalTypes";
import useCalculableIntervalIndices from "../hooks/use-calculable-interval-indices";
import { CalculableIntervalIndice } from "@/lib/types/calculable-interval-indices";
import {
  calculosMap,
  tiposIndiceCalculableMap,
} from "@/lib/types/calculable-indices";
import CalculableIntervalIndicesFiltersContainer from "../filters/calculable-interval-indices-filters-container";

interface Props {
  configVersion: string;
}

export default function CalculableIntervalIndicesList({
  configVersion,
}: Props) {
  const {
    calculableIntervalIndices,
    filters,
    loadingData: loadingDataTools,
    fetchCalculableIntervalIndices,
  } = useCalculableIntervalIndices({
    defaultsFilters: {
      versionConfig: configVersion,
    },
  });
  const { handleOpenModal } = useContext(ModalContext);

  const handleCreate = useCallback(() => {
    handleOpenModal({
      name: modalTypes.newCalculableNoIntervalIndiceModal.name,
      entity: configVersion,
      actionExecute: fetchCalculableIntervalIndices,
    });
  }, [handleOpenModal, configVersion, fetchCalculableIntervalIndices]);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.editToolModal.name,
        entity: id,
        actionExecute: fetchCalculableIntervalIndices,
      });
    },
    [handleOpenModal, fetchCalculableIntervalIndices]
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
        actionExecute: fetchCalculableIntervalIndices,
      });
    },
    [handleOpenModal, fetchCalculableIntervalIndices]
  );

  const columns: ColumnDef<CalculableIntervalIndice>[] = [
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
          color={
            tiposIndiceCalculableMap.get(row.getValue("tipo"))?.color as string
          }
        >
          {tiposIndiceCalculableMap.get(row.getValue("tipo"))?.name as string}
        </Badge>
      ),
    },
    {
      accessorKey: "calculo",
      header: "Cálculo",
      cell: ({ row }) => (
        <Badge
          color={calculosMap.get(row.getValue("calculo"))?.color as string}
        >
          {calculosMap.get(row.getValue("calculo"))?.name as string}
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
        data={calculableIntervalIndices}
        isLoading={loadingDataTools}
        initialVisibilityState={{ id: false }}
        filters={
          <CalculableIntervalIndicesFiltersContainer
            filters={filters.filters}
            getActiveFiltersCount={filters.getActiveFiltersCount}
            handleChangeFilters={filters.handleChangeFilters}
            handleResetFilters={filters.handleResetFilters}
          />
        }
        addButton={{
          buttonText: "Crear Indice por Intervalo",
          action: handleCreate,
        }}
      />
    </div>
  );
}
