"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useSubsystem from "../../hooks/use-subsystem";
import EditSubsystemFormContainer from "./edit-subsystem-form-container";

export default function EditSubsystemModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.editSubsystemModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { subsystem, loading, error, fetchSubsystem } = useSubsystem({ id });

  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        subsystem && !error ? (
          <EditSubsystemFormContainer subsystem={subsystem} />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchSubsystem}
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
