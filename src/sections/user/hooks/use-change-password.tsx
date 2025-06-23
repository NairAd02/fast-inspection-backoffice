"use client";
import { useCallback, useState } from "react";
import { changePasswordUser as changePasswordUserService } from "@/lib/services/user";
import { convertChangePasswordUserDTO } from "@/lib/types/user";
import { ChangePassword } from "../form/profile/components/change-password-mode-form/schemas/change-password-schema";

interface Props {
  id: string;
  onChangePassowrdAction: () => void;
}

export default function useChangePassword({
  id,
  onChangePassowrdAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePasswordUser = useCallback(
    async (changePassowrd: ChangePassword) => {
      try {
        setLoading(true);
        setError(null);
        const res = await changePasswordUserService(
          convertChangePasswordUserDTO(changePassowrd, id)
        );
        if (!res.response || res.error)
          setError(
            res.error?.reason || "Error en el cambio de contraseña del usuario"
          );
        else {
          onChangePassowrdAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onChangePassowrdAction, id]
  );
  return {
    loading,
    error,
    changePasswordUser,
  };
}
