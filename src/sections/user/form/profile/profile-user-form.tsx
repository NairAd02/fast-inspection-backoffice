"use client";

import { User } from "lucide-react";

import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import ProfileRolSection from "./components/profile-rol-section/profile-rol-section";

import { AlertDestructive } from "@/components/ui/alert-destructive";

interface Props {
  error?: string | null;
}

export default function UserProfileModal({ error }: Props) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {error && <AlertDestructive title={error} />}
        <div className="pb-4">
          <div className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5" />
            Información Personal
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <RHFTextField
              name="nombreUsuario"
              label="Nombre de Usuario"
              fullWidth
            />
          </div>
          <div className="space-y-2">
            <RHFTextField name="email" label="Email" fullWidth disabled />
            <p className="text-xs text-muted-foreground">
              El email no puede ser modificado
            </p>
          </div>
          <ProfileRolSection />
        </div>
      </div>
    </div>
  );
}
