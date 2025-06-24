"use client";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function ProfileRolSection() {
  const { watch } = useFormContext();
  const rol = watch("rol");

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <Shield className="w-4 h-4" />
        Rol del Sistema
      </Label>
      <div>
        <Badge variant="secondary" className="text-sm">
          {rol}
        </Badge>
        <p className="text-xs text-muted-foreground mt-1">
          Tu rol determina los permisos en el sistema
        </p>
      </div>
    </div>
  );
}
