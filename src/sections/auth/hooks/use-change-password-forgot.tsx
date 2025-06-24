"use client";
import { useCallback, useState } from "react";
import { changePasswordForgot as changePasswordForgotService } from "@/lib/services/auth";
import { convertChangePasswordForgotDTO } from "@/lib/types/auth";

import { ChangePasswordForgot } from "../form/change-password-forgot/schemas/change-password-forgot-schema";

interface Props {
  onChangePasswordForgotAction: () => void;
}

export default function useChangePasswordForgot({
  onChangePasswordForgotAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePasswordForgot = useCallback(
    async (changePasswordForgot: ChangePasswordForgot, userId: string) => {
      try {
        setLoading(true);
        setError(null);

        const res = await changePasswordForgotService(
          userId,
          convertChangePasswordForgotDTO(changePasswordForgot)
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError(res.error?.reason || "Error en el cambio de contraseña");
        } else {
          onChangePasswordForgotAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onChangePasswordForgotAction]
  );
  return {
    loading,
    error,
    changePasswordForgot,
  };
}
