"use client"

import { Form } from "@/components/ui/form"
import { use, useCallback } from "react"
import { useForm } from "react-hook-form"
import UserForm from "../user-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewUserSchema } from "./new-user-schema"
import useCreateUser from "../../hooks/use-create-user"
import { toast } from "react-toastify"
import { ModalContext } from "@/components/modal/context/modalContext"
import { modalTypes } from "@/components/modal/types/modalTypes"
import { revalidateServerTags } from "@/lib/cache"
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes"
import { Button } from "@/components/ui/button"

export default function NewUserFormContainer() {
    const { handleCloseModal } = use(ModalContext);
    const { loading, action } = useCreateUser({
        onCreateAction: () => {
            toast.success("Usuario creado con éxito");
            handleClose();
            revalidateServerTags(tagsCacheByRoutes.users.multipleTag);
        },
    })

    const form = useForm<NewUserSchema>({
        resolver: zodResolver(NewUserSchema),
        defaultValues: {
            nombreUsuario: "",
            email: "",
            contrasena: "",
            rol: "Súper Administrador"
        },
        mode: "onChange"
    })

    const handleClose = () => {
        handleCloseModal(modalTypes.newUserModal.name);
    };

    const onSubmit = useCallback((data: NewUserSchema) => {
        action(data)
    }, [])

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <UserForm />
            <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant={"default"} type="submit" disabled={loading || !form.formState.isValid}>
                    Crear usuario
                </Button>
            </div>
        </form>
    </Form>
}