"use client";
import { useCallback, useState } from "react";
import { verifyCode as verifyCodeService } from "@/lib/services/auth";
import { convertVerifyCodeDTO } from "@/lib/types/auth";
import { VerifyCode } from "../form/verify-code/shcemas/verify-code-schema";

interface Props {
  onVerifyCodeAction: () => void;
}

export default function useVerifyCode({ onVerifyCodeAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyCode = useCallback(
    async (verifyCode: VerifyCode, userId: string) => {
      try {
        setLoading(true);
        setError(null);

        const res = await verifyCodeService(
          convertVerifyCodeDTO(verifyCode, userId)
        );
        if (!res.response || res.error) {
          console.log(res.error);
          setError(res.error?.reason || "Error en la verificación del código");
        } else {
          onVerifyCodeAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onVerifyCodeAction]
  );
  return {
    loading,
    error,
    verifyCode,
  };
}
