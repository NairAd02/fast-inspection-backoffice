export const apiRoutes = {
  auth: {
    login: `${process.env.NEXT_PUBLIC_API_URL}users-auth/login`,
  },
  configs: {
    get: `${process.env.NEXT_PUBLIC_API_URL}configs/getAllConfigs`,
    getById: `${process.env.NEXT_PUBLIC_API_URL}configs/getConfigByVersion/:versionConfig`,
    createNewConfig: `${process.env.NEXT_PUBLIC_API_URL}configs/createNewConfig`,
    createConfigByOtherConfig: `${process.env.NEXT_PUBLIC_API_URL}configs/createConfigByOtherConfig/:versionOtherConfig`,
    editConfig: `${process.env.NEXT_PUBLIC_API_URL}configs/updateConfig/:version`,
    deleteConfig: `${process.env.NEXT_PUBLIC_API_URL}configs/deleteConfig/:version`,
    markConfigAsActive: `${process.env.NEXT_PUBLIC_API_URL}configs/marcarAsActivaConfig/:version`,
    getSystemsConfig: `${process.env.NEXT_PUBLIC_API_URL}configs/getSistemasConfig/:version`,
  },
  systems: {
    getById: `${process.env.NEXT_PUBLIC_API_URL}sistemas-config/getSistemaConfig/:id`,
    create: `${process.env.NEXT_PUBLIC_API_URL}sistemas-config/createSistemaConfig`,
    edit: `${process.env.NEXT_PUBLIC_API_URL}sistemas-config/updateSistemaConfig/:id`,
    delete: `${process.env.NEXT_PUBLIC_API_URL}sistemas-config/deleteSistemaConfig/:id`,
  },
  subsystem: {
    create: `${process.env.NEXT_PUBLIC_API_URL}subsistemas-config/createSubsistemaConfig`,
    edit: `${process.env.NEXT_PUBLIC_API_URL}subsistemas-config/updateSubsistemaConfig/:id`,
  },
  tools: {
    get: `${process.env.NEXT_PUBLIC_API_URL}herramienta-analisis-criticidad/getAllHerramientasAnalisisCriticidad`,
  },
} as const;

export const tagsCacheByRoutes = {
  configs: {
    singleTag: "config",
    multipleTag: "configs",
    systemsTag: "systems",
  },
  systems: {
    singleTag: "system",
    multipleTag: "systems",
  },
  subsystems: {
    singleTag: "system",
    multipleTag: "systems",
  },
  tools: {
    singleTag: "tool",
    multipleTag: "tools",
  },
} as const;
