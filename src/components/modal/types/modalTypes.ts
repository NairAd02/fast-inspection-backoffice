export interface InfoModal {
  name: string;
  // matadata
  entity?: string; // id entity
  secondaryEntity?: string;
  elements?: any[];
  actionInsert?: (element: any) => void;
  onClose?: () => void;
  onOpen?: () => void;
  actionExecute?: () => void;
}
export interface SectionModal {
  name: string;
  title?: string;
}
export interface ModalTypes {
  newConfigModal: SectionModal;
  editConfigModal: SectionModal;
  deleteConfigModal: SectionModal & {
    message: string;
    warningMessage: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  markConfigAsActiveModal: SectionModal & {
    message: string;
    warningMessage: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  replicateConfigModal: SectionModal;
  newSystemModal: SectionModal;
  editSystemModal: SectionModal;
  deleteSystemModal: SectionModal & {
    message: string;
    warningMessage: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  newSubsystemModal: SectionModal;
  editSubsystemModal: SectionModal;
  deleteSubsystemModal: SectionModal & {
    message: string;
    warningMessage: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  newMaterialModal: SectionModal;
  editMaterialModal: SectionModal;
  deleteMaterialModal: SectionModal & {
    message: string;
    warningMessage: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  newDeteriorationTypeModal: SectionModal;
  editDeteriorationTypeModal: SectionModal;
  deleteDeteriorationTypeModal: SectionModal & {
    message: string;
    warningMessage: string;
    cancelButtonText: string;
    confirmButtonText: string;
  };
  detailsDeteriorationTypeModal: SectionModal;
  newToolModal: SectionModal;
}

export const modalTypes: ModalTypes = {
  newConfigModal: {
    name: "newConfigModal",
    title: "Formulario de Configuración",
  },
  editConfigModal: {
    name: "editConfigModal",
    title: "Formulario de Edición de Configuración",
  },
  deleteConfigModal: {
    name: "deleteConfigModal",
    title: "Eliminación de Configuración",
    message: "¿Está seguro de que desea eliminar la configuración?",
    warningMessage:
      "Esta acción provocará la eliminación permanente de la configuración.",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
  markConfigAsActiveModal: {
    name: "markConfigAsActiveModal",
    title: "Cambio de estado de la Configuración",
    message: "¿Está seguro de que desea cambiar el estado de la configuración?",
    warningMessage:
      "Tenga en cuenta que si la configuración cambia su estado a activa, sobre esta serña que se basarán las inspecciones de ahora en adelante.",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
  replicateConfigModal: {
    name: "replicateConfigModal",
    title: "Formulario de Replicación de Configuración",
  },
  newSystemModal: {
    name: "newSystemModal",
    title: "Formulario de creación de Sistema",
  },
  editSystemModal: {
    name: "editSystemModal",
    title: "Formulario de edición de Sistema",
  },
  deleteSystemModal: {
    name: "deleteSystemModal",
    title: "Eliminación de Sistema",
    message: "¿Está seguro de que desea eliminar el sistema?",
    warningMessage:
      "Esta acción provocará la eliminación permanente del sistema.",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
  newSubsystemModal: {
    name: "newSubsystemModal",
    title: "Formulario de creación de Subsistema",
  },
  editSubsystemModal: {
    name: "editSubsystemModal",
    title: "Formulario de edición de Subsistema",
  },
  deleteSubsystemModal: {
    name: "deleteSubsystemModal",
    title: "Eliminación de Subsistema",
    message: "¿Está seguro de que desea eliminar el subsistema?",
    warningMessage:
      "Esta acción provocará la eliminación permanente del subsistema.",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
  newMaterialModal: {
    name: "newMaterialModal",
    title: "Formulario de creación de Material",
  },
  editMaterialModal: {
    name: "editMaterialModal",
    title: "Formulario de edición de Material",
  },
  deleteMaterialModal: {
    name: "deleteMaterialModal",
    title: "Eliminación de Material",
    message: "¿Está seguro de que desea eliminar el material?",
    warningMessage:
      "Esta acción provocará la eliminación permanente del material.",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
  newDeteriorationTypeModal: {
    name: "newDeteriorationTypeModal",
    title: "Formulario de creación de Tipo de Deterioro",
  },
  editDeteriorationTypeModal: {
    name: "editDeteriorationTypeModal",
    title: "Formulario de edición de Tipo de Deterioro",
  },
  deleteDeteriorationTypeModal: {
    name: "deleteDeteriorationTypeModal",
    title: "Eliminación de Tipo de Deterioro",
    message: "¿Está seguro de que desea eliminar el tipo de deterioro?",
    warningMessage:
      "Esta acción provocará la eliminación permanente del tipo de deterioro.",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
  detailsDeteriorationTypeModal: {
    name: "detailsDeteriorationTypeModal",
    title: "Detalles de Tipo de Deterioro",
  },
  newToolModal: {
    name: "newToolModal",
    title: "Formulario de creación de Herramienta",
  },
};
