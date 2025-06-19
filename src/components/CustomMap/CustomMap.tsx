'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type Edificacion = {
    id: number;
    nombre: string;
    direccion: string;
    coordX: number;
    coordY: number;
};

type Point = {
    lat: number;
    lng: number;
    info: string;
    edificacion: Edificacion;
};

interface CustomMapProps {
    points: Point[];
}

// Componente para ajustar automáticamente los límites del mapa
function FitBounds({ points }: { points: Point[] }) {
    const map = useMap();

    useEffect(() => {
        if (points.length === 0) return;
        const bounds = L.latLngBounds(points.map(p => [p.lat, p.lng] as [number, number]));
        map.fitBounds(bounds, { padding: [50, 50] });
    }, [points, map]);

    return null;
}

export default function CustomMap({ points }: CustomMapProps) {
    const [selected, setSelected] = useState<Point | null>(null);
    const [inspecciones, setInspecciones] = useState<any[] | null>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markerRefs = useRef<Record<number, L.Marker<any>>>({});

    // Función para abrir modal de inspecciones
    const openDetalles = useCallback(async (point: Point) => {
        setSelected(point);
        try {
            const res = await fetch(`http://31.97.43.136:3000/inspections?edificacionId=${point.edificacion.id}`);
            const json = await res.json();
            setInspecciones(json.data);
        } catch {
            setInspecciones([]);
        }
    }, []);

    // Función para centrar y hacer scroll al mapa
    const verEnMapa = useCallback((point: Point) => {
        const map = mapRef.current;
        if (!map) {
            console.warn('Mapa no listo');
            return;
        }

        map.setView([point.lat, point.lng], 17, { animate: true });

        const mapElement = document.getElementById('custom-map-container');
        if (mapElement) {
            mapElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Abrir popup del marcador si existe
        const marker = markerRefs.current[point.edificacion.id];
        if (marker) {
            marker.openPopup();
        }
    }, []);

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
                style={{ height: '800px', width: '100%' }}
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
                            <div>
                                <div dangerouslySetInnerHTML={{ __html: point.info }} />
                                <button
                                    onClick={() => openDetalles(point)}
                                    className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Detalles
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Modal inspecciones */}
            {selected && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
                    onClick={() => {
                        setSelected(null);
                        setInspecciones(null);
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
                    >
                        <h2 className="text-xl font-semibold mb-2">{selected.edificacion.nombre}</h2>
                        <p className="mb-1">
                            <span className="font-medium">Dirección:</span> {selected.edificacion.direccion}
                        </p>
                        <p className="mb-4">
                            <span className="font-medium">Coordenadas:</span> {selected.lat}, {selected.lng}
                        </p>

                        <div className="mt-4">
                            <h3 className="font-semibold text-lg mb-2">Inspecciones</h3>
                            {inspecciones === null && <p className="text-gray-500">Cargando inspecciones...</p>}
                            {inspecciones?.length === 0 && <p className="text-gray-500">Sin inspecciones registradas.</p>}
                            {inspecciones?.map((insp, idx) => (
                                <div key={idx} className="border rounded p-3 mb-2 bg-gray-50">
                                    <p>
                                        <span className="font-medium">Fecha:</span>{' '}
                                        {new Date(insp.fechaInicio).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <span className="font-medium">Versión:</span> {insp.configVersion}
                                    </p>
                                    <p>
                                        <span className="font-medium">Índice de criticidad:</span> {insp.indiceCriticidad}
                                    </p>
                                    <p>
                                        <span className="font-medium">Deterioros:</span> {insp.cantDeterioros}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => {
                                setSelected(null);
                                setInspecciones(null);
                            }}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Tabla debajo */}
            <div className="mt-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombre</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Dirección</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {points.map((point) => (
                        <tr key={point.edificacion.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-800">{point.edificacion.nombre}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{point.edificacion.direccion}</td>
                            <td className="px-4 py-2 text-sm text-gray-800 space-x-2">
                                <button
                                    onClick={() => openDetalles(point)}
                                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                >
                                    Inspecciones
                                </button>

                                <button
                                    onClick={() => verEnMapa(point)}
                                    className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                >
                                    Ver en mapa
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
    function SetMapRef({ refContainer }: { refContainer: React.MutableRefObject<L.Map | null> }) {
        const map = useMap();

        useEffect(() => {
            refContainer.current = map;
            console.log('✅ Mapa asignado desde useMap');
        }, [map]);

        return null;
    }
}
