"use client";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  ChangePasswordForgot,
  changePasswordForgotSchema,
} from "./schemas/change-password-forgot-schema";
import useChangePasswordForgot from "../../hooks/use-change-password-forgot";
import ChangePasswordForgotForm from "./change-password-forgot-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import FormActionButtons from "@/components/form/form-action-buttons/form-action-buttons";

interface Porps {
  userId: string;
}

export default function ChangePasswordForgotFormContainer({ userId }: Porps) {
  const { handleCloseModal } = useContext(ModalContext);
  const {
    loading: submitLoading,
    changePasswordForgot,
    error,
  } = useChangePasswordForgot({
    onChangePasswordForgotAction: () => {
      toast.success("Contraseña actualizada con éxito");
      handleClose();
    },
  });
  const form = useForm<ChangePasswordForgot>({
    resolver: zodResolver(changePasswordForgotSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.changePasswordForgotModal.name);
  };

  function onSubmit(changePassword: ChangePasswordForgot) {
    changePasswordForgot(changePassword, userId);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Card className="w-full flex flex-col gap-4 p-4">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Restablecer contraseña
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa tu nueva contraseña para completar el proceso de
              recuperación
            </CardDescription>
          </CardHeader>
          <ChangePasswordForgotForm error={error} />
          <FormActionButtons
            submitButtonText="Restablecer Contraseña"
            submitLoading={submitLoading}
            handleClose={handleClose}
          />
        </Card>
      </form>
    </Form>
  );
}
