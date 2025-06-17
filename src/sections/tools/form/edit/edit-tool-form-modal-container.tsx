"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import useTool from "../../hooks/use-tool";
import EditToolFormContainer from "./edit-tool-form-container";

export default function EditToolModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.editToolModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { tool, loading, error, fetchTool } = useTool({ id });
  const fetchTools =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : null;

  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        tool && !error ? (
          <EditToolFormContainer
            tool={tool}
            fetchTools={fetchTools as () => Promise<void>}
          />
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
