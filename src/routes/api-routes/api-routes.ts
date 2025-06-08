export const apiRoutes = {
  auth: {
    login: `${process.env.NEXT_PUBLIC_API_URL}users-auth/login`,
  },
  configs: {
    get: `${process.env.NEXT_PUBLIC_API_URL}configs/getAllConfigs`,
    getById: `${process.env.NEXT_PUBLIC_API_URL}config/:id`,
    createNewConfig: `${process.env.NEXT_PUBLIC_API_URL}configs/createNewConfig`,
    createConfigByOtherConfig: `${process.env.NEXT_PUBLIC_API_URL}configs/createConfigByOtherConfig/{versionOtherConfig}`
  },
} as const;

export const tagsCacheByRoutes = {
  configs: {
    singleTag: "config",
    multipleTag: "configs",
  },
} as const;
