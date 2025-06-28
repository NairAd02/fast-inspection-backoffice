"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import React, { useCallback, useContext } from "react";

interface Props {
  edificationId: string;
}

export default function EdificationPopoverViewDetailsButton({
  edificationId,
}: Props) {
  const { handleOpenModal } = useContext(ModalContext);
  const handleViewDetails = useCallback(() => {
    handleOpenModal({
      name: modalTypes.detailsEdificationModal.name,
      entity: edificationId,
    });
  }, [handleOpenModal, edificationId]);

  return (
    <Button
      size="sm"
      className="w-full flex gap-2"
      onClick={handleViewDetails}
    >
      <Eye className="h-4 w-4" />
      Ver Detalles
    </Button>
  );
}
