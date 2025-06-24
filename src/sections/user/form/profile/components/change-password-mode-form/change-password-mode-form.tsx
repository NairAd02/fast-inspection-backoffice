"use client";
import { RHFPasswordField } from "@/components/form/rhf-components/rhf-password-field/rhf-password-field";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { Button } from "@/components/ui/button";

import React, { Dispatch, SetStateAction } from "react";

interface Props {
  setChangePasswordMode: Dispatch<SetStateAction<"form" | "reset" | null>>;
  error?: string | null;
}

export default function ChangePasswordModeForm({
  setChangePasswordMode,
  error,
}: Props) {
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
      {error && <AlertDestructive title={error} />}
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Cambiar Contraseña</h4>
        <Button
          variant="ghost"
          type="button"
          size="sm"
          onClick={() => setChangePasswordMode(null)}
        >
          Cancelar
        </Button>
      </div>

      <div className="space-y-3">
        {/* Contraseña Actual */}
        <div className="space-y-2">
          <RHFPasswordField
            name="oldPassword"
            label="Contraseña Actual"
            fullWidth
          />
        </div>
      </div>

      {/* Nueva Contraseña */}
      <div className="space-y-2">
        <RHFPasswordField
          name="newPassword"
          label="Nueva Contraseña"
          fullWidth
        />
      </div>

      {/* Confirmar Nueva Contraseña */}
      <div className="space-y-2">
        <RHFPasswordField
          name="confirmPassword"
          label="Confirmar Contraseña"
          fullWidth
        />
      </div>
    </div>
  );
}
