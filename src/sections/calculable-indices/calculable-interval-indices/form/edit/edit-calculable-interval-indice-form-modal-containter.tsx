"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useCalculableIntervalIndice from "../../hooks/use-calculable-interval-indice";
import EditCalculableIntervalIndiceFormContainer from "./edit-calculable-interval-indice-form-containter";

export default function EditCalculableIntervalIndiceModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(
    modalTypes.editCalculableIntervalIndiceModal.name
  );
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const {
    calculableIntervalIndice,
    loading,
    error,
    fetchCalculableIntervalIndice,
  } = useCalculableIntervalIndice({ id });
  const fetchCalculableIntervalIndices =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;

  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        calculableIntervalIndice && !error ? (
          <EditCalculableIntervalIndiceFormContainer
            calculableIntervalIndice={calculableIntervalIndice}
            fetchCalculableIntervalIndices={
              fetchCalculableIntervalIndices as () => Promise<void>
            }
          />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchCalculableIntervalIndice}
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
