"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";
import UserMenu from "../../user-menu";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { paths } from "@/routes/path";
import OptionsLinksContainer from "./options-links/options-links-container";

export default function HeaderNavBar() {
  const { data: session, status } = useSession();
  return status === "loading" ? (
    <></>
  ) : (
    <nav className="flex flex-row md:flex-row-reverse items-center gap-2 md:gap-6">
      <div className="flex items-center gap-2 md:gap-6">
        {!session && (
          <NavigationComponent href={paths.sign_in.root}>
            <Button
              className="text-[11px] md:text-base"
              variant="outline"
              size="sm"
            >
              Iniciar Sesión
            </Button>
          </NavigationComponent>
        )}
        <NavigationComponent href={paths.configs.root}>
          <Button className="text-[11px] md:text-base" size="sm">
            Comenzar
          </Button>
        </NavigationComponent>

        {session && <UserMenu />}
      </div>
      <div>
        <OptionsLinksContainer />
      </div>
    </nav>
  );
}
