"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Mail } from "lucide-react";
import ChangePasswordModeFormContainer from "../change-password-mode-form/change-password-mode-form-container";
import ChangePasswordModeResetSection from "../change-password-mode-reset-section/change-password-mode-reset-section";
import React, { useState } from "react";
import { UserDetails } from "@/lib/types/user";

interface Props {
  user: UserDetails;
}

export default function ChangePasswordMode({ user }: Props) {
  const [changePasswordMode, setChangePasswordMode] = useState<
    "form" | "reset" | null
  >(null);
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lock className="w-5 h-5" />
          Seguridad
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!changePasswordMode && (
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => setChangePasswordMode("form")}
              className="w-full justify-start"
            >
              <Lock className="w-4 h-4 mr-2" />
              Cambiar Contraseña
            </Button>
            <Button
              variant="outline"
              onClick={() => setChangePasswordMode("reset")}
              className="w-full justify-start"
            >
              <Mail className="w-4 h-4 mr-2" />
              Olvidé mi Contraseña
            </Button>
          </div>
        )}

        {/* Formulario de cambio de contraseña */}
        {changePasswordMode === "form" && (
          <ChangePasswordModeFormContainer
            userId={user.id}
            setChangePasswordMode={setChangePasswordMode}
          />
        )}

        {/* Opción de recuperación de contraseña */}
        {changePasswordMode === "reset" && (
          <ChangePasswordModeResetSection
            setChangePasswordMode={setChangePasswordMode}
            user={user}
          />
        )}
      </CardContent>
    </Card>
  );
}
