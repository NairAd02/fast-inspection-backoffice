"use client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import dynamic from "next/dynamic";
import { MapEventsHandler } from "./map-events-handler";

// Importación dinámica de Leaflet para evitar problemas con SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface Props {
  name: string;
  label?: string;
  description?: string;
  fullWidth?: boolean;
  initialPosition?: { lat: number; lng: number };
}

export function RHFMapPicker({
  name,
  label,
  description,
  fullWidth = true,
}: Props) {
  const { control, setValue, getValues } = useFormContext();
  
  // Obtener valores iniciales del formulario o usar valores por defecto
  const initialCoordX = getValues(`${name}.coordX`);
  const initialCoordY = getValues(`${name}.coordY`);
  
  const [position, setPosition] = useState(() => {
    if (initialCoordX && initialCoordY) {
      return { lat: initialCoordY, lng: initialCoordX };
    }
    return { lat: 19.4326, lng: -99.1332 }; // Ciudad de México como posición inicial
  });

  useEffect(() => {
    // Actualizar los valores del formulario cuando cambia la posición
    if (position) {
      setValue(`${name}.coordX`, position.lng);
      setValue(`${name}.coordY`, position.lat);
    }
  }, [position, name, setValue]);

  const handleMapClick = (latlng: { lat: number; lng: number }) => {
    setPosition(latlng);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={`${fullWidth ? "w-full" : ""}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="h-64 w-full rounded-md border">
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100%", width: "100%", borderRadius: "0.375rem" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>Ubicación seleccionada</Popup>
                </Marker>
                <MapEventsHandler onMapClick={handleMapClick} />
              </MapContainer>
            </div>
          </FormControl>
          <div className="mt-2 text-sm text-gray-500">
            <p>Coordenadas seleccionadas:</p>
            <p>Latitud: {position.lat.toFixed(6)}</p>
            <p>Longitud: {position.lng.toFixed(6)}</p>
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}