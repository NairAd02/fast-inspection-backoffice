import { z } from "zod";

export interface EdificationCreate {
  nombre: string;
  direccion: string;
  position: {
    coordX: number;
    coordY: number;
  };
}

export const edificationCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre de la edificación es requerido" }),
  direccion: z
    .string()
    .min(1, { message: "La dirección de la edificación es requerida" }),
  position: z.object({
    coordX: z.number().min(1, { message: "La coordenada X es requerida" }),
    coordY: z.number().min(1, { message: "La coordenada Y es requerida" }),
  }),
});
