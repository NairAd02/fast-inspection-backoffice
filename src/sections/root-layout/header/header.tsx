import { Building2Icon } from "lucide-react";
import React from "react";
import HeaderNavBar from "./components/user-menu/components/header-nav-bar/header-nav-bar";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { paths } from "@/routes/path";

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between p-4 md:px-12">
        <NavigationComponent href={paths.landing.root}>
          <div className="flex items-center space-x-1 md:space-x-2">
            <Building2Icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <span className="text-md md:text-xl font-bold text-gray-900">
              Fast-Inspection
            </span>
          </div>
        </NavigationComponent>

        <HeaderNavBar />
      </div>
    </header>
  );
}
