"use client";

import {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import EdificationPopoverContainer from "@/sections/edifications/components/edification-popover/edification-popover-container";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Edificacion = {
  id: number;
  nombre: string;
  direccion: string;
  coordX: number;
  coordY: number;
};

export type Point = {
  lat: number;
  lng: number;
  info: string;
  edificacion: Edificacion;
};

interface CustomMapProps {
  points: Point[];
}

// Definir la interfaz para los métodos expuestos
export interface CustomMapRef {
  verEnMapa: (point: Point) => void;
}

// Componente para ajustar automáticamente los límites del mapa
function FitBounds({ points }: { points: Point[] }) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;
    const bounds = L.latLngBounds(
      points.map((p) => [p.lat, p.lng] as [number, number])
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [points, map]);

  return null;
}

const CustomMap = forwardRef<CustomMapRef, CustomMapProps>(
  ({ points }, ref) => {
    const mapRef = useRef<L.Map | null>(null);
    const markerRefs = useRef<Record<number, L.Marker<any>>>({});

    // Función para centrar y hacer scroll al mapa
    const verEnMapa = useCallback((point: Point) => {
      const map = mapRef.current;
      if (!map) {
        console.warn("Mapa no listo");
        return;
      }

      map.setView([point.lat, point.lng], 17, { animate: true });

      const mapElement = document.getElementById("custom-map-container");
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Abrir popup del marcador si existe
      const marker = markerRefs.current[point.edificacion.id];
      if (marker) {
        marker.openPopup();
      }
    }, []);

    // Exponer métodos al componente padre
    useImperativeHandle(
      ref,
      () => ({
        verEnMapa,
      }),
      [verEnMapa]
    );

    return (
      <>
        <MapContainer
          id="custom-map-container"
          // whenCreated={(mapInstance) => {
          //     mapRef.current = mapInstance;
          //     console.log(mapRef.current)
          // }}
          className="relative z-0"
          center={[0, 0]}
          zoom={2}
          style={{ height: "800px", width: "100%" }}
        >
          <SetMapRef refContainer={mapRef} />
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds points={points} />
          {points.map((point) => (
            <Marker
              key={point.edificacion.id}
              position={[point.lat, point.lng]}
              ref={(ref) => {
                if (ref) markerRefs.current[point.edificacion.id] = ref;
              }}
            >
              <Popup>
                <EdificationPopoverContainer
                  edificationId={point.edificacion.id.toString()}
                />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </>
    );
  }
);

function SetMapRef({
  refContainer,
}: {
  refContainer: React.MutableRefObject<L.Map | null>;
}) {
  const map = useMap();

  useEffect(() => {
    refContainer.current = map;
    console.log("✅ Mapa asignado desde useMap");
  }, [map, refContainer]);

  return null;
}

CustomMap.displayName = "CustomMap";

export default CustomMap;
