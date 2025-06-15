"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import DeteriorationTypeDetailsContainer from "./deterioration-type-details-container";
import useDeteriorationType from "../hooks/use-deterioration-type";

export default function DeteriorationTypeDetailsModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.detailsDeteriorationTypeModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { deteriorationType, loading, error, fetchDeteriorationType } =
    useDeteriorationType({ id });

  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        deteriorationType && !error ? (
          <DeteriorationTypeDetailsContainer
            deteriorationType={deteriorationType}
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
