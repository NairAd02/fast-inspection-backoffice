"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { Button } from "@/components/ui/button";
import { UserDetails } from "@/lib/types/user";
import useSendVerificationCode from "@/sections/sign-in/form/hooks/use-send-verification-code";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { toast } from "react-toastify";

interface Props {
  setChangePasswordMode: Dispatch<SetStateAction<"form" | "reset" | null>>;
  user: UserDetails;
}

export default function ChangePasswordModeResetSection({
  setChangePasswordMode,
  user,
}: Props) {
  const { handleOpenModal } = useContext(ModalContext);
  const { sendVerificationCode, loading, error } = useSendVerificationCode({
    userId: user.id,
    onSendVerificationCodeAction: () => {
      toast.success("Código de verificación enviado, revise su correo");
      handleOpenModal({
        name: modalTypes.verifyCodeModal.name,
        entity: user.id,
      });
    },
  });

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
      {error && <AlertDestructive title={error} />}
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Recuperar Contraseña</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setChangePasswordMode(null)}
        >
          Cancelar
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Se enviará un código de recuperación a: <br />
          <strong>{user.email}</strong>
        </p>
        <Button
          onClick={() => {
            sendVerificationCode();
          }}
          disabled={loading}
          className="w-full"
        >
          Enviar Enlace de Recuperación
        </Button>
      </div>
    </div>
  );
}
