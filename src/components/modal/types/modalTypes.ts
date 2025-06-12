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
};
