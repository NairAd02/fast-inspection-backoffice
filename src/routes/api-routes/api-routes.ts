export const apiRoutes = {
  auth: {
    login: `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
  },
  configs: {
    get: `${process.env.NEXT_PUBLIC_API_URL}config`,
    getById: `${process.env.NEXT_PUBLIC_API_URL}config/:id`,
  },
} as const;

export const tagsCacheByRoutes = {
  config: {
    singleTag: "config",
    multipleTag: "configs",
  },
} as const;
