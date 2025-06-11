"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { ConfigDetails } from "@/lib/types/configs";
import React, { useCallback, useContext } from "react";
import ConfigCard from "../../components/config-card/config-card";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";

interface Props {
  config: ConfigDetails;
}

export default function ConfigGeneralInformationSection({ config }: Props) {
  const router = useRouter();
  const { handleOpenModal } = useContext(ModalContext);

  const onEdit = useCallback(
    (id: string) => {
      handleOpenModal({ name: modalTypes.editConfigModal.name, entity: id });
    },
    [handleOpenModal]
  );

  const onReplicate = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.replicateConfigModal.name,
        entity: id,
        actionExecute: () => {
          router.push(paths.configs.root);
        },
      });
    },
    [handleOpenModal, router]
  );

  const onMarkAsActive = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.markConfigAsActiveModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const onDelete = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.deleteConfigModal.name,
        entity: id,
        actionExecute: () => {
          router.push(paths.configs.root);
        },
      });
    },
    [handleOpenModal, router]
  );
  return (
    <ConfigCard
      config={config}
      withAdministrationButton={false}
      onEdit={onEdit}
      onReplicate={onReplicate}
      onMarkAsActive={onMarkAsActive}
      onDelete={onDelete}
    />
  );
}
