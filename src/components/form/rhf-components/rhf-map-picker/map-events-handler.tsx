"use client";
import { useMapEvents } from "react-leaflet";

interface MapEventsHandlerProps {
  onMapClick: (latlng: { lat: number; lng: number }) => void;
}

export function MapEventsHandler({ onMapClick }: MapEventsHandlerProps) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });

  return null;
} 