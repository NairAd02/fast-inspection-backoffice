import { Calculos } from "@/lib/types/calculable-indices";
import { z } from "zod";
import {
  IndicatorIntervalCreate,
  indicatorIntervalCreateSchema,
} from "./indicator-interval-create-schema";

export interface CalculableIntervalIndiceCreate {
  nombre: string;
  calculo: Calculos;
  indicadoresIntervalos: IndicatorIntervalCreate[];
}

export const calculableNoIntervalIndiceCreateSchema = z
  .object({
    nombre: z
      .string()
      .min(1, { message: "El nombre de la configuración es requerido" }),
    calculo: z.enum([
      Calculos.Criticidad,
      Calculos.Detectabilidad,
      Calculos.Frecuencia,
      Calculos.Impacto,
    ]),
    indicadoresIntervalos: z.array(indicatorIntervalCreateSchema),
  })
  .refine(
    (data) => {
      if (data.indicadoresIntervalos.length === 0) {
        return true; // Si no hay intervalos, la validación pasa
      }

      // Ordenar los intervalos por límite inferior
      const sortedIntervals = [...data.indicadoresIntervalos].sort(
        (a, b) => a.limiteInferior - b.limiteInferior
      );

      // Verificar que el primer intervalo comience en 0 o 1
      const firstInterval = sortedIntervals[0];
      if (
        firstInterval.limiteInferior !== 0 &&
        firstInterval.limiteInferior !== 1
      ) {
        return false;
      }

      // Verificar que los intervalos sean continuos
      for (let i = 0; i < sortedIntervals.length - 1; i++) {
        const currentInterval = sortedIntervals[i];
        const nextInterval = sortedIntervals[i + 1];

        // Si el intervalo actual no tiene límite superior, debe ser el último
        if (!currentInterval.limiteSuperior) {
          if (i !== sortedIntervals.length - 1) {
            return false; // Solo el último intervalo puede no tener límite superior
          }
          continue;
        }

        // Verificar que el siguiente intervalo comience exactamente donde termina el actual
        if (nextInterval.limiteInferior !== currentInterval.limiteSuperior) {
          return false;
        }
      }

      // Verificar que el último intervalo tenga límite superior (a menos que sea el único)
      const lastInterval = sortedIntervals[sortedIntervals.length - 1];
      if (sortedIntervals.length === 1 && !lastInterval.limiteSuperior) {
        return true; // Un solo intervalo sin límite superior es válido
      }

      return true;
    },
    {
      message:
        "Los intervalos deben ser continuos sin espacios muertos. El primer intervalo debe comenzar en 0 o 1, y cada intervalo debe terminar exactamente donde comienza el siguiente. Solo el último intervalo puede no tener límite superior.",
      path: ["indicadoresIntervalos"],
    }
  );
