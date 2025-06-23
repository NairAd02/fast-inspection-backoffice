import { ReactNode } from "react";
import { paths } from "../path";
import { Package, User } from "lucide-react";

export interface GroupRoute {
  title: string;
  navigationRoutes: NavigationRoute[];
}

export interface NavigationRoute {
  title: string;
  path: string;
  icon?: ReactNode;
  isActive?: boolean;
  children?: NavigationRoute[];
}

export const groupRoutes: GroupRoute[] = [
  {
    title: "Seguridad",
    navigationRoutes: [
      {
        title: "Usuarios",
        icon: <User />,
        path: paths.users.root,
      },
    ],
  },
  {
    title: "Administración",
    navigationRoutes: [
      {
        title: "Configuraciones",
        icon: <Package />,
        path: paths.configs.root,
      },
      {
        title: "Edificaciones",
        icon: <Package />,
        path: paths.edifications.root,
      }
    ],
  },
];
