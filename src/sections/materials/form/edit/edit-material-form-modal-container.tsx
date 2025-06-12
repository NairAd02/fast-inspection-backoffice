"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useMaterial from "../../hooks/use-material";
import EditMaterialFormContainer from "./edit-material-form-container";

export default function EditMaterialModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.editMaterialModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { material, loading, error, fetchMaterial } = useMaterial({ id });

  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        material && !error ? (
          <EditMaterialFormContainer material={material} />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchMaterial}
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
