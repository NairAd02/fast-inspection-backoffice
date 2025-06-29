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
import { EditUserSchema } from "./edit-user-schema";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Form } from "@/components/ui/form";
import UserForm from "../user-form";
import FormActionButtons from "@/components/form/form-action-buttons/form-action-buttons";

interface Props {
  user: UserDetails;
}

export default function EditUserFormContainer({ user }: Props) {
  const { handleCloseModal } = use(ModalContext);
  const {
    loading: submitLoading,
    action,
    error,
  } = useEditUser({
    id: user.id.toString(),
    onEditAction: () => {
      toast.success("Usuario editado con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.users.multipleTag);
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
    handleCloseModal(modalTypes.editUserModal.name);
  };

  function onSubmit(data: EditUserSchema) {
    action(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <UserForm isEdit error={error} />
        <FormActionButtons
          submitButtonText="Editar Usuario"
          submitLoading={submitLoading}
          handleClose={handleClose}
        />
      </form>
    </Form>
  );
}
