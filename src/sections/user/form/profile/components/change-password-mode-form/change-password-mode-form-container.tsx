"use client";

import { SetStateAction, Dispatch } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  ChangePassword,
  changePasswordSchema,
} from "./schemas/change-password-schema";
import { Button } from "@/components/ui/button";
import ChangePasswordModeForm from "./change-password-mode-form";
import useChangePassword from "@/sections/user/hooks/use-change-password";

interface Porps {
  userId: string;
  setChangePasswordMode: Dispatch<SetStateAction<"form" | "reset" | null>>;
}

export default function ChangePasswordModeFormContainer({
  userId,
  setChangePasswordMode,
}: Porps) {
  const {
    loading: submitLoading,
    changePasswordUser,
    error,
  } = useChangePassword({
    id: userId,
    onChangePassowrdAction: () => {
      toast.success("Contraseña actualizada con éxito");
      setChangePasswordMode(null);
    },
  });
  const form = useForm<ChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(changePassword: ChangePassword) {
    changePasswordUser(changePassword);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-4 h-full"
      >
        <ChangePasswordModeForm
          setChangePasswordMode={setChangePasswordMode}
          error={error}
        />
        <Button type="submit" disabled={submitLoading} className="w-full">
          Actualizar Contraseña
        </Button>
      </form>
    </Form>
  );
}
