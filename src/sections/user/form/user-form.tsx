import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { Role } from "@/lib/types/user";

const options = Role.map(role => ({
    label: role,
    value: role
}))

interface Props {
    isEdit?: boolean;
    error?: string | null;
}

export default function UserForm({ isEdit, error }: Props) {
    return <div className="flex flex-col gap-4">
        {error && <AlertDestructive title={error} />}
        <RHFTextField
            name="nombreUsuario"
            label="Nombre"
            placeholder="Introduzca el nombre del usuario"
            fullWidth
        />
        <RHFTextField
            name="email"
            label="Email"
            placeholder="Introduzca el nombre del usuario"
            fullWidth
            disabled={!!isEdit}

        />
        <RHFTextField
            name="contrasena"
            label="Contraseña"
            type="password"
            placeholder="Introduzca la contraseña"
            fullWidth
        />
        <RHFSelectField name="rol" label="Rol" placeholder="Seleccione el rol del usuario" options={options} />
    </div>
}