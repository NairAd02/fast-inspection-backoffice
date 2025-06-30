"use client";
import React from "react";
import { useCallback, useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import {
  Edification,
  getEdificationCriticalitColor,
  getEdificationCriticalityLabel,
} from "@/lib/types/edifications";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { EditIcon, EyeIcon, MapPinIcon, Trash2Icon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import EdificationsFiltersContainer from "../filters/edifications-filters-container";
import { Badge } from "@/components/ui/badge";

interface Props {
  edifications: Edification[];
  centeredMap: (id: number) => void;
}

export default function EdificationTable({ edifications, centeredMap }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.editEdificationModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const handleViewDetails = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.detailsEdificationModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const handleDelete = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.deleteEdificationModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const columns: ColumnDef<Edification>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "direccion",
      header: "Dirección",
    },
    {
      id: "criticidad",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            {row.getValue("criticidad")}
            <Badge
              color={getEdificationCriticalitColor(row.getValue("criticidad"))}
            >
              {getEdificationCriticalityLabel(row.getValue("criticidad"))}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "cantDeterioros",
      header: "Cantidad de Deterioros",
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
                  label: "Centrar en mapa",
                  icon: <MapPinIcon />,
                  action: () => {
                    centeredMap(row.getValue("id"));
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
        data={edifications}
        initialVisibilityState={{ id: false }}
        filters={<EdificationsFiltersContainer />}
      />
    </div>
  );
}
