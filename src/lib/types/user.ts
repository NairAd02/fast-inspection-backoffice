
export type Role = (typeof Role)[number]
export const Role = [
    "Súper Administrador", "Administrador", "Especialista Ing Civil", "Especialista Ing Civil Avanzado"
] as const

export type User = {
    "id": string,
    "nombreUsuario": string,
    "email": string,
    "rol": string,
    "isActiva": boolean
}

export type UserDetails = {
    "id": string,
    "nombreUsuario": string,
    "email": string,
    "rol": string,
    "isActiva": boolean
}