"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";
import UserMenu from "../../user-menu";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { paths } from "@/routes/path";

export default function HeaderNavBar() {
  const { data: session, status } = useSession();
  return status === "loading" ? (
    <></>
  ) : (
    <nav className="hidden md:flex items-center space-x-6">
      <a
        href="#features"
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        Características
      </a>
      <a
        href="#process"
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        Proceso
      </a>
      <a
        href="#pricing"
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        Precios
      </a>
      {!session && (
        <NavigationComponent href={paths.sign_in.root}>
          <Button variant="outline" size="sm">
            Iniciar Sesión
          </Button>
        </NavigationComponent>
      )}
      <Button size="sm">Comenzar</Button>
      {session && <UserMenu />}
    </nav>
  );
}
