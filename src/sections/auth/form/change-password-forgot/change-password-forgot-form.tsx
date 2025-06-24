import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { CardContent } from "@/components/ui/card";
import React from "react";

interface Props {
  error?: string | null;
}

export default function ChangePasswordForgotForm({ error }: Props) {
  return (
    <CardContent className="flex flex-col gap-4 p-4">
      {error && <AlertDestructive title={error} />}
      <RHFTextField name="password" label="Contraseña" fullWidth />
      <RHFTextField
        name="confirmPassword"
        label="Confirmar contraseña"
        fullWidth
      />
    </CardContent>
  );
}
