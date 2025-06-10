interface Path {
  root: string;
  isProtected: boolean;
}

interface PathWithParams extends Path {
  (params?: Record<string, string>, query?: Record<string, string>): Path;
}

interface ApplicationPath {
  home: Path;
  sign_in: Path;
  configs: Path;
  config_management: PathWithParams;
  edifications: Path;
}

function buildPathWithParams(
  basePath: string,
  params?: Record<string, string>,
  query?: Record<string, string>
): Path {
  // Replace route parameters
  let pathWithParams = basePath;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      pathWithParams = pathWithParams.replace(`:${key}`, value);
    }
  }

  // Add query parameters
  let queryString = "";
  if (query) {
    const params = new URLSearchParams(query);
    queryString = params.toString();
  }

  return {
    root: queryString ? `${pathWithParams}?${queryString}` : pathWithParams,
    isProtected:
      basePath.startsWith("/dashboard") ||
      basePath.startsWith("/landing/profile"),
  };
}

export const paths: ApplicationPath = {
  home: {
    root: "/",
    isProtected: false,
  },
  sign_in: {
    root: "/landing/sign-in",
    isProtected: false,
  },
  configs: {
    root: "/dashboard/configs",
    isProtected: true,
  },
  config_management: Object.assign(
    (params?: Record<string, string>, query?: Record<string, string>) =>
      buildPathWithParams("/configs/:id", params, query),
    {
      root: "/configs/:id",
      isProtected: false,
    }
  ),
  edifications: {
    root: "/dashboard/edifications",
    isProtected: true,
  },
} as const;

export const isProtectedRoute = (route: string): boolean => {
  const routeWithoutQuery = route.split("?")[0];

  // Check exact matches first
  for (const key in paths) {
    const path = paths[key as keyof ApplicationPath];

    if (typeof path === "function") {
      // For dynamic paths, we need to check pattern matching
      const basePath = path.root;
      const pattern = new RegExp(
        "^" + basePath.replace(/:\w+/g, "[^/]+") + "$"
      );
      if (pattern.test(routeWithoutQuery)) {
        return path().isProtected;
      }
    } else if (path.root === routeWithoutQuery) {
      return path.isProtected;
    }
  }

  return false;
};
