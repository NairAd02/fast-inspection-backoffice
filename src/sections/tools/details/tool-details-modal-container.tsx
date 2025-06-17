"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useTool from "../hooks/use-tool";
import ToolDetailsContainer from "./tool-details-container";

export default function ToolDetailsModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.detailsToolModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { tool, loading, error, fetchTool } = useTool({ id });

  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        tool && !error ? (
          <ToolDetailsContainer tool={tool} />
        ) : (
          <FetchingDataErrorPanel message={error as string} reset={fetchTool} />
        )
      ) : (
        <div className="flex justify-center flex-1 items-center h-full w-full">
          <LoadingSpinner size={100} />
        </div>
      )}
    </div>
  );
}
