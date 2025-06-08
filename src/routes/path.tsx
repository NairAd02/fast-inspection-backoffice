interface Path {
  root: string;
  isProtected: boolean;
}

interface ApplicationPath {
  home: Path;
  sign_in: Path;
  profile: Path;
  configs: Path;
  edifications: Path;
}

/*function buildQueryString(query: Record<string, string> = {}): string {
  const params = new URLSearchParams(query);
  return params.toString();
}*/

export const paths: ApplicationPath = {
  home: {
    root: "/",
    isProtected: false,
  },
  sign_in: {
    root: "/landing/sign-in",
    isProtected: false,
  },
  profile: {
    root: "/landing/profile",
    isProtected: true,
  },
  configs: {
    root: "/dashboard/configs",
    isProtected: true,
  },
  edifications: {
    root: "/dashboard/edifications",
    isProtected: true,
  },
} as const;

export const isProtectedRoute = (route: string): boolean => {
  const routeWithoutQuery = route.split("?")[0];

  for (const key in paths) {
    const path = paths[key as keyof ApplicationPath];

    if (path.root === routeWithoutQuery) {
      return path.isProtected;
    }
  }

  return false;
};
