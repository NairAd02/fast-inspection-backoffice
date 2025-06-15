"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { Tool, toolsTypeMap } from "@/lib/types/tools";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";

interface Props {
  tools: Tool[];
}

export default function ToolsList({ tools }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({ name: "modalTypes.editBrandModal.name", entity: id });
    },
    [handleOpenModal]
  );

  const handleDelete = useCallback(
    (id: string) => {
      handleOpenModal({
        name: "modalTypes.deleteBrandModal.name",
        entity: id,
      });
    },
    [handleOpenModal]
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
        initialVisibilityState={{ id: false }}
      />
    </div>
  );
}
