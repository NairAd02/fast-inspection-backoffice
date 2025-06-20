import { Inspection } from "./inspections";

export interface Edification {
  id: number;
  nombre: string;
  direccion: string;
  coordX: number;
  coordY: number;
}

export interface EdificationDetails {
  id: number;
  nombre: string;
  direccion: string;
  coordX: number;
  coordY: number;
  inspecciones: {
    data: Inspection[];
  };
}
