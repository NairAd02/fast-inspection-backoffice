"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useUser from "../../hooks/use-user";
import ProfileUserFormContainer from "./profile-user-form-container";

export default function ProfileUserModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.profileUserModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const refreshUserInfo =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;
  const { user, loading, error, fetchUser } = useUser({
    id,
  });

  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        user && !error ? (
          <ProfileUserFormContainer
            user={user}
            refreshUserInfo={refreshUserInfo as () => Promise<void>}
          />
        ) : (
          <FetchingDataErrorPanel message={error as string} reset={fetchUser} />
        )
      ) : (
        <div className="flex justify-center flex-1 items-center h-full w-full">
          <LoadingSpinner size={100} />
        </div>
      )}
    </div>
  );
}
