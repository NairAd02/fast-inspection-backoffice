import { Building2Icon } from "lucide-react";
import React from "react";
import HeaderNavBar from "./components/user-menu/components/header-nav-bar/header-nav-bar";

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between p-4 md:px-12">
        <div className="flex items-center space-x-1 md:space-x-2">
          <Building2Icon className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
          <span className="text-md md:text-xl font-bold text-gray-900">InspectPro</span>
        </div>
        <HeaderNavBar />
      </div>
    </header>
  );
}
