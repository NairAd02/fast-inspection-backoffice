"use client";

import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { User } from "@/lib/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, EditIcon, EyeIcon, XCircle } from "lucide-react";
import { use, useCallback } from "react";

interface Props {
    users: User[]
}

export default function UserList({ users }: Props) {
    const { handleOpenModal } = use(ModalContext);

    const handleEdit = useCallback(
        (id: string) => {
            handleOpenModal({
                name: modalTypes.editUserModal.name,
                entity: id,
            });
        },
        [handleOpenModal]
    );

    const handleViewDetails = useCallback(
        (id: string) => {
            handleOpenModal({
                name: modalTypes.detailsUserModal.name,
                entity: id,
            });
        },
        [handleOpenModal]
    );

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "id",
            enableHiding: false,
        },
        {
            accessorKey: "nombreUsuario",
            header: "Nombre",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "rol",
            header: "Rol",
        },
        {
            id: "estado",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-3">
                        {row.original.isActiva ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground">Estado</p>
                            <Badge variant={row.original.isActiva ? "default" : "destructive"} className="mt-1">
                                {row.original.isActiva ? "Activa" : "Inactiva"}
                            </Badge>
                        </div>
                    </div>
                );
            },
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
                                }
                            ]}
                        />
                    </div>
                );
            },
        },
    ];

    return <div className="p-6 mb-6 bg-white flex flex-col gap-2 rounded-lg shadow-sm">
        <div className="flex flex-col gap-4">
            <DataTable
                columns={columns}
                data={users}
                initialVisibilityState={{ id: false }}
            // filters={<EdificationsFiltersContainer />}
            />

        </div>
    </div>
}