"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useUser from "../hooks/use-user";
import UserDetailsContainer from "./user-details-container";

export default function UserDetailsModalContainer() {
    const { getInfoModal } = useContext(ModalContext);
    const infoModal = getInfoModal(modalTypes.detailsUserModal.name);
    const id = infoModal && infoModal.entity ? infoModal.entity : null;
    const { user, loading, error, fetchUser } = useUser({
        id,
    });

    return (
        <div className="flex flex-1 flex-col h-full w-full">
            {!loading ? (
                user && !error ? (
                    <UserDetailsContainer user={user} />
                ) : (
                    <FetchingDataErrorPanel
                        message={error as string}
                        reset={fetchUser}
                    />
                )
            ) : (
                <div className="flex justify-center flex-1 items-center h-full w-full">
                    <LoadingSpinner size={100} />
                </div>
            )}
        </div>
    );
}
