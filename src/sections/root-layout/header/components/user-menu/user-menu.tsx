"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
import SignOutButton from "./components/sign-out-button/sign-out-button";
import useUser from "@/sections/user/hooks/use-user";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";

export default function UserMenu() {
  const session = useSession();
  const { handleOpenModal } = useContext(ModalContext);
  const { user, loading, fetchUser } = useUser({
    id: session.data?.user?.id as string,
  });

  const handleOpenProfileModal = useCallback(() => {
    console.log("Entee");
    handleOpenModal({
      name: modalTypes.profileUserModal.name,
      entity: user?.id,
      actionExecute: fetchUser,
    });
  }, [handleOpenModal, user?.id, fetchUser]);

  if (loading) return <Skeleton className="h-10 w-10 rounded-full" />;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.nombreUsuario
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.nombreUsuario
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.nombreUsuario}
              </p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-start h-9 px-3"
            onClick={handleOpenProfileModal}
          >
            <User className="mr-3 h-4 w-4" />
            Ver perfil
          </Button>
        </div>
        <Separator />
        <div className="p-2">
          <SignOutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}
