"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useCalculableNoIntervalIndice from "../../hooks/use-calculable-no-interval-indice";
import EditCalculableNoIntervalIndiceFormContainer from "./edit-calculable-no-interval-indice-form-container";

export default function EditCalculableNoIntervalIndiceModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(
    modalTypes.editCalculableNoIntervalIndiceModal.name
  );
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const {
    calculableNoIntervalIndice,
    loading,
    error,
    fetchCalculableNoIntervalIndice,
  } = useCalculableNoIntervalIndice({ id });
  const fetchCalculableNoIntervalIndices =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;

  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        calculableNoIntervalIndice && !error ? (
          <EditCalculableNoIntervalIndiceFormContainer
            calculableNoIntervalIndice={calculableNoIntervalIndice}
            fetchCalculableNoIntervalIndices={
              fetchCalculableNoIntervalIndices as () => Promise<void>
            }
          />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchCalculableNoIntervalIndice}
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
