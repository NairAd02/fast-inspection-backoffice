"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";
import UserMenu from "../../user-menu";

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
        <Button variant="outline" size="sm">
          Iniciar Sesión
        </Button>
      )}
      <Button size="sm">Comenzar Gratis</Button>
      {session && <UserMenu />}
    </nav>
  );
}
