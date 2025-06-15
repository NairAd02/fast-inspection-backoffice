"use client";
import { RHFMultiSelectField } from "@/components/form/rhf-components/rhf-multi-select-field/rhf-multi-select-field";
import DeteriorationTypeFormBasicInformation from "./sections/deterioration-type-form-basic-information/deterioration-type-form-basic-information";
import { RHFListField } from "@/components/form/rhf-components/rhf-list-field/rhf-list-field";
import { CauseCreateDTO } from "@/lib/types/causes";
import RHFStackCause from "./rhf-components/rhf-stack-cause/rhf-stack-cause";
import RHFDefinedFields from "./rhf-components/rhf-defined-fields/rhf-defined-fields";
import useFields from "@/sections/fields/hooks/use-fields";

interface Props {
  toolId: string;
}

export default function DeteriorationTypeForm({ toolId }: Props) {
  console.log(toolId);
  const { fields, loadingData: loadingDataFields } = useFields({
    defaultsFilters: { idHerramienta: toolId },
  });
  return (
    <div className="mx-auto w-full p-6 max-h-[70vh] space-y-6 overflow-auto">
      <DeteriorationTypeFormBasicInformation />

      <div className="grid grid-cols-2 gap-6">
        <RHFMultiSelectField
          name="camposAfectados"
          options={fields.map((field) => ({
            value: field.id.toString(),
            label: field.nombre + ` (${field.nivelImportancia})`,
          }))}
          loading={loadingDataFields}
          cardTitle="Campos Afectados"
          label="Seleccione los campos afectados"
        />

        <RHFListField<CauseCreateDTO>
          name="causas"
          label="Causas"
          emptyText="No se han introducido causas"
          newItem={{ nombre: "" }}
          StackComponent={RHFStackCause}
        />
      </div>

      <RHFDefinedFields />
    </div>
  );
}
