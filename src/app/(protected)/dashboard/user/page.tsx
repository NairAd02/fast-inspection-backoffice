import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { SearchParamsPagination } from "@/lib/types/pagination";
import UserDetailsModalContainer from "@/sections/user/details/user-details-modal-container";
import EditUserModalContainer from "@/sections/user/form/edit/edit-edification-form-modal-container";
import NewUserFormContainer from "@/sections/user/form/new/new-user-form-container";
import UserContainer from "@/sections/user/user-container";

interface Props {
    searchParams: Promise<SearchParamsPagination>
}

export default async function UserPage({ searchParams }: Props) {

    return <>
        <UserContainer searchParams={await searchParams} />
        <Modal
            formPath={modalTypes.newUserModal.name}
            title={modalTypes.newUserModal.title}
            maxWidth="max-w-2xl"
        >
            <NewUserFormContainer />
        </Modal>

        <Modal
            formPath={modalTypes.editUserModal.name}
            title={modalTypes.editUserModal.title}
            maxWidth="max-w-2xl"
            className="min-h-[70vh]"
        >
            <EditUserModalContainer />
        </Modal>

        <Modal
            formPath={modalTypes.detailsUserModal.name}
            title={modalTypes.detailsUserModal.title}
            maxWidth="max-w-4xl"
            className="min-h-[70vh] max-h-[90vh]"
        >
            <UserDetailsModalContainer />
        </Modal>
    </>
}