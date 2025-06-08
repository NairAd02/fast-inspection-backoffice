export interface InfoModal {
  name: string;
  // matadata
  entity?: string; // id entity
  elements?: any[];
  actionInsert?: (element: any) => void;
  onClose?: () => void;
  onOpen?: () => void;
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
    title: "Activación de la configuración",
    message: "¿Está seguro de que desea marcar como activa la configuración?",
    warningMessage:
      "Esta acción provocará que la configuración sea la configuración sobre la que se basarán las inspecciones de ahora en adelante.",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  },
};
