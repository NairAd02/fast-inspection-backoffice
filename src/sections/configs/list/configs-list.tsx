"use client";
import { Config } from "@/lib/types/configs";
import React, { useCallback, useContext } from "react";
import ConfigCard from "../components/config-card/config-card";
import EmptyContent from "@/components/empty-content/empty-content";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";

interface Props {
  configs: Config[];
}

export default function ConfigsList({ configs }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const onEdit = useCallback(
    (id: string) => {
      handleOpenModal({ name: modalTypes.editConfigModal.name, entity: id });
    },
    [handleOpenModal]
  );

  return configs.length > 0 ? (
    <div className=" w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {configs.map((config, index) => (
        <ConfigCard key={index} config={config} onEdit={onEdit} />
      ))}
    </div>
  ) : (
    <EmptyContent
      title="No hay configuraciones registradas"
      description="Todavía no se han registrado configuraciones en el sistema."
    />
  );
}
