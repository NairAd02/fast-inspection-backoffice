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
};
