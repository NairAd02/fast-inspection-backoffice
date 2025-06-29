import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { SearchParamsPagination } from "@/lib/types/pagination";
import UserDetailsModalContainer from "@/sections/user/details/user-details-modal-container";
import EditUserModalContainer from "@/sections/user/form/edit/edit-user-form-modal-container";
import NewUserFormContainer from "@/sections/user/form/new/new-user-form-container";
import UserContainer from "@/sections/user/user-container";
import { User } from "lucide-react";

interface Props {
  searchParams: Promise<SearchParamsPagination>;
}

export default async function UserPage({ searchParams }: Props) {
  return (
    <>
      <UserContainer searchParams={await searchParams} />
      <Modal
        formPath={modalTypes.newUserModal.name}
        title={modalTypes.newUserModal.title}
        maxWidth="max-w-2xl"
        icon={<User />}
      >
        <NewUserFormContainer />
      </Modal>

      <Modal
        formPath={modalTypes.editUserModal.name}
        title={modalTypes.editUserModal.title}
        maxWidth="max-w-2xl"
        className="min-h-[36vh]"
        icon={<User />}
      >
        <EditUserModalContainer />
      </Modal>

      <Modal
        formPath={modalTypes.detailsUserModal.name}
        title={modalTypes.detailsUserModal.title}
        maxWidth="max-w-2xl"
        className="min-h-[37vh] max-h-[90vh]"
        icon={<User />}
      >
        <UserDetailsModalContainer />
      </Modal>
    </>
  );
}
