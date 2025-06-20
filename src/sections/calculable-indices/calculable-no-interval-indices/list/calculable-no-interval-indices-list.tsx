"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";
import { modalTypes } from "@/components/modal/types/modalTypes";
import {
  calculosMap,
  tiposIndiceCalculableMap,
} from "@/lib/types/calculable-indices";
import useCalculableNoIntervalIndices from "../hooks/use-calculable-no-interval-indices";
import { CalculableNoIntervalIndice } from "@/lib/types/calculable-no-interval-indices";
import CalculableNoIntervalIndicesFiltersContainer from "../filters/calculable-no-interval-indices-filters-container";

interface Props {
  configVersion: string;
}

export default function CalculableNoIntervalIndicesList({
  configVersion,
}: Props) {
  const {
    calculableNoIntervalIndices,
    filters,
    loadingData: loadingDataTools,
    fetchCalculableNoIntervalIndices,
  } = useCalculableNoIntervalIndices({
    defaultsFilters: {
      versionConfig: configVersion,
    },
  });
  const { handleOpenModal } = useContext(ModalContext);

  const handleCreate = useCallback(() => {
    handleOpenModal({
      name: modalTypes.newCalculableNoIntervalIndiceModal.name,
      entity: configVersion,
      actionExecute: fetchCalculableNoIntervalIndices,
    });
  }, [handleOpenModal, configVersion, fetchCalculableNoIntervalIndices]);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.editCalculableNoIntervalIndiceModal.name,
        entity: id,
        actionExecute: fetchCalculableNoIntervalIndices,
      });
    },
    [handleOpenModal, fetchCalculableNoIntervalIndices]
  );

  const handleViewDetails = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.detailsCalculableNoIntervalIndiceModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const handleDelete = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.deleteCalculableNoIntervalIndiceModal.name,
        entity: id,
        actionExecute: fetchCalculableNoIntervalIndices,
      });
    },
    [handleOpenModal, fetchCalculableNoIntervalIndices]
  );

  const columns: ColumnDef<CalculableNoIntervalIndice>[] = [
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
        data={calculableNoIntervalIndices}
        isLoading={loadingDataTools}
        initialVisibilityState={{ id: false }}
        filters={
          <CalculableNoIntervalIndicesFiltersContainer
            filters={filters.filters}
            getActiveFiltersCount={filters.getActiveFiltersCount}
            handleChangeFilters={filters.handleChangeFilters}
            handleResetFilters={filters.handleResetFilters}
          />
        }
        addButton={{
          buttonText: "Crear Indice sin Intervalo",
          action: handleCreate,
        }}
      />
    </div>
  );
}
