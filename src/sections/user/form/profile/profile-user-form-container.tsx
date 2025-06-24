"use client";

import { ModalContext } from "@/components/modal/context/modalContext";
import { UserDetails } from "@/lib/types/user";
import { use } from "react";
import useEditUser from "../../hooks/use-edit-user";
import { toast } from "react-toastify";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Form } from "@/components/ui/form";
import { EditUserSchema } from "../edit/edit-user-schema";
import ProfileUserForm from "./profile-user-form";
import { Button } from "@/components/ui/button";
import ChangePasswordMode from "./components/change-password-mode/change-password-mode";
import { User } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Props {
  user: UserDetails;
  refreshUserInfo: () => Promise<void>;
}

export default function ProfileUserFormContainer({
  user,
  refreshUserInfo,
}: Props) {
  const { handleCloseModal } = use(ModalContext);
  const {
    loading: submitLoading,
    action,
    error,
  } = useEditUser({
    id: user.id.toString(),
    onEditAction: () => {
      toast.success("Información de perfil actualizada con éxito");
      revalidateServerTags(tagsCacheByRoutes.users.multipleTag);
      refreshUserInfo();
    },
  });
  const form = useForm<EditUserSchema>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      email: user.email,
      rol: user.rol as any,
      contrasena: "",
      nombreUsuario: user.nombreUsuario,
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.profileUserModal.name);
  };

  function onSubmit(data: EditUserSchema) {
    action(data);
  }
  return (
    <div className="w-full flex flex-1 flex-col justify-between gap-4 h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Perfil de Usuario</h2>
          <p className="text-muted-foreground">
            Gestiona tu información personal y seguridad
          </p>
        </div>
      </div>
      <div className="flex w-full h-full gap-2 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <Card className="w-full h-full flex flex-col justify-between gap-4 p-6">
              <ProfileUserForm error={error} />
              <Button type="submit" disabled={submitLoading}>
                Guardar Cambios
              </Button>
            </Card>
          </form>
        </Form>
        <ChangePasswordMode user={user} />
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant={"outline"} onClick={handleClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
}
