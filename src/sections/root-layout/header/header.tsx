import { Button } from "@/components/ui/button";
import { Building2Icon } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2Icon className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">InspectPro</span>
        </div>
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
          <Button variant="outline" size="sm">
            Iniciar Sesión
          </Button>
          <Button size="sm">Comenzar Gratis</Button>
        </nav>
      </div>
    </header>
  );
}
