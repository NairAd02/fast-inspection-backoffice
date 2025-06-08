import { Building2Icon } from "lucide-react";
import React from "react";
import HeaderNavBar from "./components/user-menu/components/header-nav-bar/header-nav-bar";

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2Icon className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">InspectPro</span>
        </div>
        <HeaderNavBar />
      </div>
    </header>
  );
}
