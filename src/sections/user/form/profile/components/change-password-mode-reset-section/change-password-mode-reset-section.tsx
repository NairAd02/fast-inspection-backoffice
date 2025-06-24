"use client";
import { Button } from "@/components/ui/button";
import { UserDetails } from "@/lib/types/user";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  setChangePasswordMode: Dispatch<SetStateAction<"form" | "reset" | null>>;
  user: UserDetails;
}

export default function ChangePasswordModeResetSection({
  setChangePasswordMode,
  user,
}: Props) {
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
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
          Se enviará un enlace de recuperación a: <br />
          <strong>{user.email}</strong>
        </p>
        <Button className="w-full">Enviar Enlace de Recuperación</Button>
      </div>
    </div>
  );
}
