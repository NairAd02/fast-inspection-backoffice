"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import EditDeteriorationFormContainer from "./edit-deterioration-type-form-container";
import useDeteriorationType from "../../hooks/use-deterioration-type";

export default function EditDeteriorationTypeModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.editDeteriorationTypeModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const toolId =
    infoModal && infoModal.secondaryEntity ? infoModal.secondaryEntity : null;
  const { deteriorationType, loading, error, fetchDeteriorationType } =
    useDeteriorationType({ id });

  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        deteriorationType && !error ? (
          <EditDeteriorationFormContainer
            deteriorationType={deteriorationType}
            toolId={toolId as string}
          />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchDeteriorationType}
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
