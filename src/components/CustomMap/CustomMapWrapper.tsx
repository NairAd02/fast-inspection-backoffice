"use client";

import { useRef, forwardRef, useImperativeHandle, useCallback } from "react";
import dynamic from "next/dynamic";
import { Point } from "./CustomMap";

// Importar CustomMap dinámicamente con SSR deshabilitado
const CustomMap = dynamic(() => import("./CustomMap"), { ssr: false });

// Definir la interfaz para los métodos expuestos por el wrapper
export interface CustomMapWrapperRef {
  verEnMapa: (point: Point) => void;
  centrarEnEdificio: (id: number) => void;
}

interface Props {
  points: Point[];
}

const CustomMapWrapper = forwardRef<CustomMapWrapperRef, Props>(
  ({ points }, ref) => {
    const mapRef = useRef<any>(null);

    // Función que puede ser llamada desde el componente padre
    const centrarEnEdificio = useCallback(
      (id: number) => {
        const point = points.find((p) => p.edificacion.id === id);
        if (point && mapRef.current) {
          mapRef.current.verEnMapa(point);
        }
      },
      [points]
    );

    // Función que expone directamente verEnMapa
    const verEnMapa = useCallback((point: Point) => {
      if (mapRef.current) {
        mapRef.current.verEnMapa(point);
      }
    }, []);

    // Exponer métodos al componente padre
    useImperativeHandle(
      ref,
      () => ({
        verEnMapa,
        centrarEnEdificio,
      }),
      [verEnMapa, centrarEnEdificio]
    );

    return <CustomMap ref={mapRef} points={points} />;
  }
);

CustomMapWrapper.displayName = "CustomMapWrapper";

export default CustomMapWrapper;
