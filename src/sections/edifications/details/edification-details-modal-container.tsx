"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useEdification from "../hooks/use-edification";
import EdificationDetailsContainer from "./edification-details-container";

export default function EdificationDetailsModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.detailsEdificationModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { edification, loading, error, fetchEdification } = useEdification({
    id,
  });

  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        edification && !error ? (
          <EdificationDetailsContainer edification={edification} />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchEdification}
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
