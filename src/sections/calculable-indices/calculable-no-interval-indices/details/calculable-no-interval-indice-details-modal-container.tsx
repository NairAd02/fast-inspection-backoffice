"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useCalculableNoIntervalIndice from "../hooks/use-calculable-no-interval-indice";
import { CalculableNoIntervalIndiceDetailsContainer } from "./calculable-no-interval-indice-details-container";

export default function CalculableNoIntervalIndiceDetailsModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(
    modalTypes.detailsCalculableNoIntervalIndiceModal.name
  );
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const {
    calculableNoIntervalIndice,
    loading,
    error,
    fetchCalculableNoIntervalIndice,
  } = useCalculableNoIntervalIndice({ id });

  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        calculableNoIntervalIndice && !error ? (
          <CalculableNoIntervalIndiceDetailsContainer
            calculableNoIntervalIndice={calculableNoIntervalIndice}
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
