import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import DeleteCalculableIntervalIndiceModalContainer from "@/sections/calculable-indices/calculable-interval-indices/delete/delete-calculable-interval-indice-modal-container";
import CalculableIntervalIndiceDetailsModalContainer from "@/sections/calculable-indices/calculable-interval-indices/details/calculable-interval-indice-details-modal-container";
import EditCalculableIntervalIndiceModalContainer from "@/sections/calculable-indices/calculable-interval-indices/form/edit/edit-calculable-interval-indice-form-modal-containter";
import NewCalculableIntervalIndiceModalContainer from "@/sections/calculable-indices/calculable-interval-indices/form/new/new-calculable-interval-indice-form-modal-container";
import DeleteCalculableNoIntervalIndiceModalContainer from "@/sections/calculable-indices/calculable-no-interval-indices/delete/delete-calculable-no-interval-indice-modal-container";
import CalculableNoIntervalIndiceDetailsModalContainer from "@/sections/calculable-indices/calculable-no-interval-indices/details/calculable-no-interval-indice-details-modal-container";
import EditCalculableNoIntervalIndiceModalContainer from "@/sections/calculable-indices/calculable-no-interval-indices/form/edit/edit-calculable-no-interval-indice-form-modal-container";
import NewCalculableNoIntervalIndiceModalContainer from "@/sections/calculable-indices/calculable-no-interval-indices/form/new/new-calculable-no-interval-indice-form-modal-container";
import ConfigManagementContainer from "@/sections/configs/config-management/config-management-container";
import { RevalidateConfigInformationProvider } from "@/sections/configs/context/revalidate-config-information-context/revalidate-config-information-context";
import DeleteDeteriorationTypeModalContainer from "@/sections/deterioration-types/delete/delete-deterioration-type-modal-container";
import DeteriorationTypeDetailsModalContainer from "@/sections/deterioration-types/details/deterioration-type-details-modal-container";
import EditDeteriorationTypeModalContainer from "@/sections/deterioration-types/form/edit/edit-deterioration-type-form-modal-container";
import NewDeteriorationTypeModalContainer from "@/sections/deterioration-types/form/new/new-deterioration-type-form-modal-container";
import DeleteMaterialModalContainer from "@/sections/materials/delete/delete-material-modal-container";
import EditMaterialModalContainer from "@/sections/materials/form/edit/edit-material-form-modal-container";
import NewMaterialModalContainer from "@/sections/materials/form/new/new-material-form-modal-container";
import DeleteSubsystemModalContainer from "@/sections/subsystems/delete/delete-subsystem-modal-container";
import EditSubsystemModalContainer from "@/sections/subsystems/form/edit/edit-subsystem-form-modal-container";
import NewSubsystemModalContainer from "@/sections/subsystems/form/new/new-subsystem-form-modal-container";
import DeleteSystemModalContainer from "@/sections/systems/delete/delete-system-modal-container";
import EditSystemModalContainer from "@/sections/systems/form/edit/edit-system-form-modal-containter";
import NewSystemModalContainer from "@/sections/systems/form/new/new-system-form-modal-container";
import DeleteToolModalContainer from "@/sections/tools/delete/delete-tool-modal-container";
import ToolDetailsModalContainer from "@/sections/tools/details/tool-details-modal-container";
import EditToolModalContainer from "@/sections/tools/form/edit/edit-tool-form-modal-container";
import NewToolFormModalContainer from "@/sections/tools/form/new/new-tool-form-modal-container";
import { Building, Ruler, Wrench } from "lucide-react";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Administración de Configuración",
  description: "Administre la configuración especificada",
};

export default async function ConfigManagementPage({ params }: Props) {
  const id = (await params).id;
  return (
    <>
      <RevalidateConfigInformationProvider configVersion={id}>
        <ConfigManagementContainer version={id} />
        {/* Modals Systems */}
        <Modal
          formPath={modalTypes.newSystemModal.name}
          title={modalTypes.newSystemModal.title}
          icon={<Building />}
        >
          <NewSystemModalContainer />
        </Modal>
        <Modal
          formPath={modalTypes.editSystemModal.name}
          title={modalTypes.editSystemModal.title}
          icon={<Building />}
        >
          <EditSystemModalContainer />
        </Modal>
        <Modal
          formPath={modalTypes.deleteSystemModal.name}
          title={modalTypes.deleteSystemModal.title}
          icon={<Building />}
        >
          <DeleteSystemModalContainer />
        </Modal>

        {/* Modals Subsystems */}
        <Modal
          formPath={modalTypes.newSubsystemModal.name}
          title={modalTypes.newSubsystemModal.title}
          icon={<Building />}
        >
          <NewSubsystemModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.editSubsystemModal.name}
          title={modalTypes.editSubsystemModal.title}
          icon={<Building />}
        >
          <EditSubsystemModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.deleteSubsystemModal.name}
          title={modalTypes.deleteSubsystemModal.title}
          icon={<Building />}
        >
          <DeleteSubsystemModalContainer />
        </Modal>

        {/* Modals Materials */}
        <Modal
          formPath={modalTypes.newMaterialModal.name}
          title={modalTypes.newMaterialModal.title}
          icon={<Building />}
        >
          <NewMaterialModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.editMaterialModal.name}
          title={modalTypes.editMaterialModal.title}
          icon={<Building />}
        >
          <EditMaterialModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.deleteMaterialModal.name}
          title={modalTypes.deleteMaterialModal.title}
          icon={<Building />}
        >
          <DeleteMaterialModalContainer />
        </Modal>

        {/* Modals Deterioration Types */}
        <Modal
          formPath={modalTypes.newDeteriorationTypeModal.name}
          title={modalTypes.newDeteriorationTypeModal.title}
          icon={<Building />}
          maxWidth="max-w-4xl"
          className="max-h-[90vh]"
        >
          <NewDeteriorationTypeModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.editDeteriorationTypeModal.name}
          title={modalTypes.editDeteriorationTypeModal.title}
          icon={<Building />}
          maxWidth="max-w-4xl"
          className="min-h-[70vh] max-h-[90vh]"
        >
          <EditDeteriorationTypeModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.deleteDeteriorationTypeModal.name}
          title={modalTypes.deleteDeteriorationTypeModal.title}
          icon={<Building />}
        >
          <DeleteDeteriorationTypeModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.detailsDeteriorationTypeModal.name}
          title={modalTypes.detailsDeteriorationTypeModal.title}
          icon={<Building />}
          maxWidth="max-w-4xl"
          className="min-h-[70vh] max-h-[90vh]"
        >
          <DeteriorationTypeDetailsModalContainer />
        </Modal>

        {/* Modals Tools */}
        <Modal
          formPath={modalTypes.newToolModal.name}
          title={modalTypes.newToolModal.title}
          icon={<Wrench />}
        >
          <NewToolFormModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.editToolModal.name}
          title={modalTypes.editToolModal.title}
          maxWidth="max-w-2xl"
          className="min-h-[30vh] max-h-[90vh]"
          icon={<Wrench />}
        >
          <EditToolModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.deleteToolModal.name}
          title={modalTypes.deleteToolModal.title}
          icon={<Wrench />}
        >
          <DeleteToolModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.detailsToolModal.name}
          title={modalTypes.detailsToolModal.title}
          maxWidth="max-w-2xl"
          className="min-h-[70vh] max-h-[90vh]"
          icon={<Wrench />}
        >
          <ToolDetailsModalContainer />
        </Modal>

        {/* Modals Calculable No Interval Indices */}
        <Modal
          formPath={modalTypes.newCalculableNoIntervalIndiceModal.name}
          title={modalTypes.newCalculableNoIntervalIndiceModal.title}
          icon={<Ruler />}
        >
          <NewCalculableNoIntervalIndiceModalContainer />
        </Modal>
        <Modal
          formPath={modalTypes.editCalculableNoIntervalIndiceModal.name}
          title={modalTypes.editCalculableNoIntervalIndiceModal.title}
          maxWidth="max-w-2xl"
          className="min-h-[40vh] max-h-[90vh]"
          icon={<Ruler />}
        >
          <EditCalculableNoIntervalIndiceModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.deleteCalculableNoIntervalIndiceModal.name}
          title={modalTypes.deleteCalculableNoIntervalIndiceModal.title}
          icon={<Ruler />}
        >
          <DeleteCalculableNoIntervalIndiceModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.detailsCalculableNoIntervalIndiceModal.name}
          title={modalTypes.detailsCalculableNoIntervalIndiceModal.title}
          icon={<Ruler />}
          maxWidth="max-w-2xl"
          className="min-h-[70vh] max-h-[90vh]"
        >
          <CalculableNoIntervalIndiceDetailsModalContainer />
        </Modal>

        {/* Modals Calculable Interval Indices */}
        <Modal
          formPath={modalTypes.newCalculableIntervalIndiceModal.name}
          title={modalTypes.newCalculableIntervalIndiceModal.title}
          icon={<Ruler />}
          maxWidth="max-w-2xl"
        >
          <NewCalculableIntervalIndiceModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.editCalculableIntervalIndiceModal.name}
          title={modalTypes.editCalculableIntervalIndiceModal.title}
          icon={<Ruler />}
          maxWidth="max-w-2xl"
          className="min-h-[40vh] max-h-[90vh]"
        >
          <EditCalculableIntervalIndiceModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.deleteCalculableIntervalIndiceModal.name}
          title={modalTypes.deleteCalculableIntervalIndiceModal.title}
          icon={<Ruler />}
        >
          <DeleteCalculableIntervalIndiceModalContainer />
        </Modal>

        <Modal
          formPath={modalTypes.detailsCalculableIntervalIndiceModal.name}
          title={modalTypes.detailsCalculableIntervalIndiceModal.title}
          icon={<Ruler />}
          maxWidth="max-w-2xl"
          className="min-h-[70vh] max-h-[90vh]"
        >
          <CalculableIntervalIndiceDetailsModalContainer />
        </Modal>
      </RevalidateConfigInformationProvider>
    </>
  );
}
