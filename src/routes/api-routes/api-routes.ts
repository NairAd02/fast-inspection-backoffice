export const apiRoutes = {
  auth: {
    login: `${process.env.NEXT_PUBLIC_API_URL}users-auth/login`,
    sendVerificationCode: `${process.env.NEXT_PUBLIC_API_URL}users-auth/enviarCodigoVerificacionIdentidad/:idUsuario`,
    verifyCode: `${process.env.NEXT_PUBLIC_API_URL}users-auth/verificarCodigoIdentidad`,
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
  subsystems: {
    getById: `${process.env.NEXT_PUBLIC_API_URL}subsistemas-config/getSubsistemaConfig/:id`,
    create: `${process.env.NEXT_PUBLIC_API_URL}subsistemas-config/createSubsistemaConfig`,
    edit: `${process.env.NEXT_PUBLIC_API_URL}subsistemas-config/updateSubsistemaConfig/:id`,
    delete: `${process.env.NEXT_PUBLIC_API_URL}subsistemas-config/deleteSubsistemaConfig/:id`,
  },
  materials: {
    getById: `${process.env.NEXT_PUBLIC_API_URL}materiales-config/getMaterial/:id`,
    create: `${process.env.NEXT_PUBLIC_API_URL}materiales-config/createMaterialConfig`,
    edit: `${process.env.NEXT_PUBLIC_API_URL}materiales-config/updateMaterialConfig/:id`,
    delete: `${process.env.NEXT_PUBLIC_API_URL}materiales-config/deleteMaterialConfig/:id`,
  },
  deteriorationTypes: {
    getById: `${process.env.NEXT_PUBLIC_API_URL}tipo-deterioro-analisis-criticidad-config/getTipoDeterioroAnalisisCriticidad/:id`,
    create: `${process.env.NEXT_PUBLIC_API_URL}tipo-deterioro-analisis-criticidad-config/createTipoDeterioroAnalisisCriticidadConfig`,
    edit: `${process.env.NEXT_PUBLIC_API_URL}tipo-deterioro-analisis-criticidad-config/updateTipoDeterioroAnalisisCriticidad/:id`,
    delete: `${process.env.NEXT_PUBLIC_API_URL}tipo-deterioros-config/deleteTipoDeterioroConfig/:id`,
  },
  tools: {
    get: `${process.env.NEXT_PUBLIC_API_URL}herramienta-analisis-criticidad/getAllHerramientasAnalisisCriticidad`,
    getById: `${process.env.NEXT_PUBLIC_API_URL}herramienta-analisis-criticidad/getHerramientaAnalisisCriticidad/:id`,
    create: `${process.env.NEXT_PUBLIC_API_URL}herramienta-analisis-criticidad/createHerramientaAnalisisCriticidad`,
    edit: `${process.env.NEXT_PUBLIC_API_URL}herramienta-analisis-criticidad/updateHerramientaAnalisisCriticidad/:id`,
    delete: `${process.env.NEXT_PUBLIC_API_URL}herramientas/deleteHerramienta/:id`,
  },
  fields: {
    get: `${process.env.NEXT_PUBLIC_API_URL}campo/getAllCampos`,
  },
  calculableIndices: {
    delete: `${process.env.NEXT_PUBLIC_API_URL}indice-calculable/deleteIndiceCalculable/:id`,
  },
  calculableIntervalIndices: {
    getById: `${process.env.NEXT_PUBLIC_API_URL}indice-calculable-intervalo/getIndiceCalculableIntervalo/:id`,
    get: `${process.env.NEXT_PUBLIC_API_URL}indice-calculable-intervalo/getAllIndicesCalculablesIntervalos`,
    create: `${process.env.NEXT_PUBLIC_API_URL}indice-calculable-intervalo/createIndiceCalculableIntervalo`,
    edit: `${process.env.NEXT_PUBLIC_API_URL}indice-calculable-intervalo/updateIndiceCalculableIntervalo/:id`,
  },
  calculableNoIntervalIndices: {
    getById: `${process.env.NEXT_PUBLIC_API_URL}indice-calculable-sin-intervalo/getIndiceCalculableSinIntervalo/:id`,
    get: `${process.env.NEXT_PUBLIC_API_URL}indice-calculable-sin-intervalo/getAllIndicesCalculablesSinIntervalos`,
    create: `${process.env.NEXT_PUBLIC_API_URL}indice-calculable-sin-intervalo/createIndiceCalculableSinIntervalo`,
    edit: `${process.env.NEXT_PUBLIC_API_URL}indice-calculable-sin-intervalo/updateIndiceCalculableSinIntervalo/:id`,
  },
  edifications: {
    getById: `${process.env.NEXT_PUBLIC_API_URL}edifications-controller/findOneEdificacion/:id`,
    get: `${process.env.NEXT_PUBLIC_API_URL}edifications-controller/findAllEdificaciones`,
    create: `${process.env.NEXT_PUBLIC_API_URL}edifications-controller/createEdificacion`,
    edit: `${process.env.NEXT_PUBLIC_API_URL}edifications-controller/updateEdificacion/:id`,
    delete: `${process.env.NEXT_PUBLIC_API_URL}edifications-controller/removeEdificacion/:id`,
  },
  inspections: {
    getById: `${process.env.NEXT_PUBLIC_API_URL}inspections/:id`,
    get: `${process.env.NEXT_PUBLIC_API_URL}inspections`,
  },
  user: {
    getById: `${process.env.NEXT_PUBLIC_API_URL}users-auth/getUsuarioById/:id`,
    get: `${process.env.NEXT_PUBLIC_API_URL}users-auth/getAllUsers/:id`,
    create: `${process.env.NEXT_PUBLIC_API_URL}users-auth/createUsuario`,
    edit: `${process.env.NEXT_PUBLIC_API_URL}users-auth/updateUser/:id`,
    changePassword: `${process.env.NEXT_PUBLIC_API_URL}users-auth/cambiarContrasena`,
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
  materials: {
    singleTag: "material",
    multipleTag: "materials",
  },
  deteriorationTypes: {
    singleTag: "deteriorationType",
    multipleTag: "deteriorationTypes",
  },
  tools: {
    singleTag: "tool",
    multipleTag: "tools",
  },
  fields: {
    singleTag: "field",
    multipleTag: "fields",
  },
  calculableIntervalIndices: {
    singleTag: "calculableIntervalIndice",
    multipleTag: "calculableIntervalIndices",
  },
  calculableNoIntervalIndices: {
    singleTag: "calculableNoIntervalIndice",
    multipleTag: "calculableNoIntervalIndices",
  },
  edifications: {
    singleTag: "edification",
    multipleTag: "edifications",
  },
  inspections: {
    singleTag: "inspection",
    multipleTag: "inspections",
  },
  users: {
    singleTag: "user",
    multipleTag: "users",
  },
} as const;
