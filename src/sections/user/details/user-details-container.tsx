import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UserDetails } from "@/lib/types/user";
import { CheckCircle, Mail, Shield, User, XCircle } from "lucide-react";

interface Props {
    user: UserDetails;
}

export default function UserDetailsContainer({ user: userData }: Props) {
    return <Card>
        <CardContent className="pt-6">
            <div className="space-y-4">
                {/* Nombre de Usuario */}
                <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">Nombre de Usuario</p>
                        <p className="text-base font-semibold">{userData.nombreUsuario}</p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p className="text-base">{userData.email}</p>
                    </div>
                </div>

                {/* Rol */}
                <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">Rol</p>
                        <Badge variant="secondary" className="mt-1">
                            {userData.rol}
                        </Badge>
                    </div>
                </div>

                {/* Estado Activo */}
                <div className="flex items-center gap-3">
                    {userData.isActiva ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">Estado</p>
                        <Badge variant={userData.isActiva ? "default" : "destructive"} className="mt-1">
                            {userData.isActiva ? "Activa" : "Inactiva"}
                        </Badge>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
}