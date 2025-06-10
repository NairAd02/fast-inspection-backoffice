"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useContext } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import useConfig from "../../hooks/use-config";
import { FetchingDataErrorPanel } from "@/components/fetching-data-error-panel/fetching-data-error-panel";
import NewConfigFormContainer from "../new/new-config-form-container";

export default function ReplicateConfigModalContainer() {
  const { getInfoModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.replicateConfigModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const actionExecute =
    infoModal && infoModal.actionExecute ? infoModal.actionExecute : undefined;
  const { config, loading, error, fetchConfig } = useConfig({ id });

  return (
    <div className="flex flex-1 flex-col h-full w-full">
      {!loading ? (
        config && !error ? (
          <NewConfigFormContainer
            replicateConfig={config}
            actionExecute={actionExecute}
          />
        ) : (
          <FetchingDataErrorPanel
            message={error as string}
            reset={fetchConfig}
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
