"use client";
import { useCallback, useState } from "react";
import { editMaterial as editMaterialService } from "@/lib/services/materials";
import { convertMaterialEditDTO } from "@/lib/types/materials";
import { MaterialEdit } from "../form/edit/schemas/material-edit-schema";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditMaterial({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editMaterial = useCallback(
    async (material: MaterialEdit) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editMaterialService(
          id,
          convertMaterialEditDTO(material)
        );
        if (!res.response || res.error)
          setError(res.error?.reason || "Error en la edición del material");
        else {
          onEditAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onEditAction, id]
  );
  return {
    loading,
    error,
    editMaterial,
  };
}
