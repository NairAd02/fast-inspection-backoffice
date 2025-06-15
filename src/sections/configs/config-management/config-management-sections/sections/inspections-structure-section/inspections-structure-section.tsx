"use client";
import { SystemDetails } from "@/lib/types/systems";
import React, { useContext } from "react";
import {
  HierarchicalTree,
  TreeAction,
  TreeItem,
} from "@/components/ui/hierarchical-tree";
import DeteriororationTypeTreeItem from "@/sections/deterioration-types/components/deterioration-type-tree-item/deterioration-type-tree-item";
import MaterialTreeItem from "@/sections/materials/components/material-tree-item/material-tree-item";
import SubsystemTreeItem from "@/sections/subsystems/components/subsystem-tree-item/subsystem-tree-item";
import SystemTreeItem from "@/sections/systems/components/system-tree-item/system-tree-item";
import { EditIcon, PlusIcon, Trash2Icon } from "lucide-react";
import AddSystemButton from "./components/add-system-button/add-system-button";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
interface Props {
  configVersion: string;
  systems: SystemDetails[];
}

export default function InspectionsStructureSection({
  configVersion,
  systems,
}: Props) {
  const { handleOpenModal } = useContext(ModalContext);
  const systemsActions: TreeAction[] = [
    {
      icon: <PlusIcon className="h-3 w-3" />,
      label: "Añadir subsistema",
      onClick: (id) => {
        handleOpenModal({
          name: modalTypes.newSubsystemModal.name,
          entity: id,
        });
      },
      variant: "ghost",
    },
    {
      icon: <EditIcon className="h-3 w-3" />,
      label: "Editar sistema",
      onClick: (id) => {
        handleOpenModal({ name: modalTypes.editSystemModal.name, entity: id });
      },
      variant: "ghost",
    },
    {
      icon: <Trash2Icon className="h-3 w-3" />,
      label: "Eliminar sistema",
      onClick: (id) => {
        handleOpenModal({
          name: modalTypes.deleteSystemModal.name,
          entity: id,
        });
      },
      variant: "destructive",
    },
  ];

  const subsystemsActions: TreeAction[] = [
    {
      icon: <PlusIcon className="h-3 w-3" />,
      label: "Añadir material",
      onClick: (id) => {
        handleOpenModal({ name: modalTypes.newMaterialModal.name, entity: id });
      },
      variant: "ghost",
    },
    {
      icon: <EditIcon className="h-3 w-3" />,
      label: "Editar subsistema",
      onClick: (id) => {
        handleOpenModal({
          name: modalTypes.editSubsystemModal.name,
          entity: id,
        });
      },
      variant: "ghost",
    },
    {
      icon: <Trash2Icon className="h-3 w-3" />,
      label: "Eliminar subsistema",
      onClick: (id) => {
        handleOpenModal({
          name: modalTypes.deleteSubsystemModal.name,
          entity: id,
        });
      },
      variant: "destructive",
    },
  ];

  const materialsActions: TreeAction[] = [
    {
      icon: <PlusIcon className="h-3 w-3" />,
      label: "Añadir tipo de deterioro",
      onClick: (id, toolId) => {
        handleOpenModal({
          name: modalTypes.newDeteriorationTypeModal.name,
          entity: id,
          secondaryEntity: toolId,
        });
      },
      variant: "ghost",
    },
    {
      icon: <EditIcon className="h-3 w-3" />,
      label: "Editar material",
      onClick: (id) => {
        handleOpenModal({
          name: modalTypes.editMaterialModal.name,
          entity: id,
        });
      },
      variant: "ghost",
    },
    {
      icon: <Trash2Icon className="h-3 w-3" />,
      label: "Eliminar material",
      onClick: (id) => {
        handleOpenModal({
          name: modalTypes.deleteMaterialModal.name,
          entity: id,
        });
      },
      variant: "destructive",
    },
  ];

  const deteriorationTypesActions: TreeAction[] = [
    {
      icon: <EditIcon className="h-3 w-3" />,
      label: "Editar tipo de deterioro",
      onClick: (id) => console.log("Editar tipo de deterioro:", id),
      variant: "ghost",
    },
    {
      icon: <Trash2Icon className="h-3 w-3" />,
      label: "Eliminar tipo de deterioro",
      onClick: (id) => console.log("Eliminar tipo de deterioro:", id),
      variant: "destructive",
    },
  ];

  const data: TreeItem[] = systems.map((system, index) => {
    const { subSistemasConfig, ...restSystem } = system;
    return {
      id: "S" + system.id.toString(),
      dataId: system.id.toString(),
      content: <SystemTreeItem key={index} system={restSystem} />,
      actions: systemsActions,
      children: subSistemasConfig.map((subsystem, index) => {
        const { materialesConfig, ...restSubsytem } = subsystem;
        return {
          id: "SUB" + subsystem.id.toString(),
          dataId: subsystem.id.toString(),
          content: <SubsystemTreeItem key={index} subsystem={restSubsytem} />,
          actions: subsystemsActions,
          children: materialesConfig.map((material, index) => {
            const { tiposDeteriorosConfig, ...restMaterial } = material;
            return {
              id: "M" + material.id.toString(),
              dataId: material.id.toString(),
              metaData: system.herramienta.id.toString(),
              content: <MaterialTreeItem key={index} material={restMaterial} />,
              actions: materialsActions,
              children: tiposDeteriorosConfig.map(
                (deteriorationType, index) => {
                  return {
                    id: "T" + deteriorationType.id.toString(),
                    dataId: deteriorationType.id.toString(),
                    metaData: system.herramienta.id.toString(),
                    content: (
                      <DeteriororationTypeTreeItem
                        key={index}
                        deteriorationType={deteriorationType}
                      />
                    ),
                    actions: deteriorationTypesActions,
                  };
                }
              ),
            };
          }),
        };
      }),
    };
  });
  return (
    <div className="flex flex-col bg-white gap-4 w-full">
      <div className="flex justify-between gap-2">
        <AddSystemButton configVersion={configVersion} />
      </div>
      <HierarchicalTree data={data} />
    </div>
  );
}
