"use client";
import { useCallback, useState } from "react";
import { NewUserSchema } from "../form/new/new-user-schema";
import { createUser } from "@/lib/services/user";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateUser({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const action = useCallback(
    async (data: NewUserSchema) => {
      try {
        setLoading(true);
        setError(null);

        const res = await createUser(data);
        if (!res.response || res.error) {
          console.log(res.error);
          setError(res.error?.reason || "Error en la creación del usuario");
        } else {
          onCreateAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onCreateAction]
  );
  return {
    loading,
    error,
    action,
  };
}
