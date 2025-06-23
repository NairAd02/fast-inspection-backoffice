"use client";
import { useCallback, useState } from "react";
import { EditUserSchema } from "../form/edit/edit-user-schema";
import { editUser } from "@/lib/services/user";
import { convertUserEditDTO } from "@/lib/types/user";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditUser({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const action = useCallback(
    async (user: EditUserSchema) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editUser(id, convertUserEditDTO(user));
        if (!res.response || res.error)
          setError(res.error?.reason || "Error en la edición de la usuario");
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
    action,
  };
}
