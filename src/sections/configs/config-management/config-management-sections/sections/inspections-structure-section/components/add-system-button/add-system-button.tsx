"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useContext } from "react";

interface Props {
  configVersion: string;
}

export default function AddSystemButton({ configVersion }: Props) {
  const { handleOpenModal } = useContext(ModalContext);
  return (
    <Button
      onClick={() => {
        handleOpenModal({
          name: modalTypes.newSystemModal.name,
          entity: configVersion,
        });
      }}
      className="flex gap-2"
    >
      <PlusIcon /> Crear nuevo sistema
    </Button>
  );
}
