import { modalTypes } from "@/components/modal/types/modalTypes";
import SectionsHeader from "@/components/sections-header/sections-header";
import { SearchParamsPagination } from "@/lib/types/pagination";
import { FileCogIcon } from "lucide-react";
import UserListContainer from "./list/user-list-container";

interface Props {
    searchParams: SearchParamsPagination;
}

export default async function UserContainer({ searchParams }: Props) {
    return <div className="flex flex-col gap-4">
        <SectionsHeader
            sectionIcon={<FileCogIcon />}
            sectionTitle="Gestión de Usuarios"
            sectionDescription="Gestione los usuarios del sistema"
            addButton={{
                isModalRedirect: true,
                buttonText: "Nuevo usuario",
                creationPath: modalTypes.newUserModal.name,
            }}
        />
        <UserListContainer searchParams={searchParams} />
    </div>
}