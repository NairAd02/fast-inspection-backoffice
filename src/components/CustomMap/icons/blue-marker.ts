import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export const blueMarkerIcon = new L.DivIcon({
  html: `
      <svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <path fill="#0066ff" stroke="#ffffff" stroke-width="1.5" d="M16 1c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10z"/>
        <circle fill="#ffffff" cx="16" cy="11" r="5"/>
      </svg>`,
  className: "custom-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
