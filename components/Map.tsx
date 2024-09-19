'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Map, { Marker, MapRef, GeolocateControl, NavigationControl } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

interface MapComponentProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
    const [marker, setMarker] = useState<[number, number] | null>(null);
    const [viewport, setViewport] = useState({
        longitude: 101.6869,
        latitude: 3.14,
        zoom: 3.5
    });

    const mapRef = useRef<MapRef>(null);
    const geocoderContainerRef = useRef<HTMLDivElement>(null);

    const handleMapClick = useCallback((event: mapboxgl.MapLayerMouseEvent) => {
        const [lng, lat] = event.lngLat.toArray();
        setMarker([lng, lat]);
        onLocationSelect(lat, lng);
    }, [onLocationSelect]);

    useEffect(() => {
        if (mapRef.current && geocoderContainerRef.current) {
            const geocoder = new MapboxGeocoder({
                accessToken: 'pk.eyJ1IjoicHJvd29uZyIsImEiOiJjbTEzbmY0ajAwcTA1MnNxMWsyY2RwZGF3In0.1qBSnkB_sKp4KNVcpDbdtw',
                mapboxgl: mapRef.current.getMap(),
            });

            geocoderContainerRef.current.appendChild(geocoder.onAdd(mapRef.current.getMap()));

            setViewport(prev => ({ ...prev }));

            geocoder.on('result', (e: any) => {
                const { center, bbox } = e.result;
                setMarker(center);
                onLocationSelect(center[1], center[0]);

                if (bbox) {
                    mapRef.current?.fitBounds(
                        [
                            [bbox[0], bbox[1]],
                            [bbox[2], bbox[3]]
                        ],
                        { padding: 50, duration: 1000 }
                    );
                } else {
                    mapRef.current?.flyTo({
                        center: center,
                        zoom: 12,
                        duration: 1000
                    });
                }
            });

            return () => {
                if (geocoderContainerRef.current && geocoderContainerRef.current.firstChild) {
                    geocoderContainerRef.current.removeChild(geocoderContainerRef.current.firstChild);
                }
            };
        }
    }, [onLocationSelect]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setViewport(prev => ({ ...prev }));
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <div ref={geocoderContainerRef} style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }} />
            <Map
                ref={mapRef}
                mapboxAccessToken='pk.eyJ1IjoicHJvd29uZyIsImEiOiJjbTEzbmY0ajAwcTA1MnNxMWsyY2RwZGF3In0.1qBSnkB_sKp4KNVcpDbdtw'
                {...viewport}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                aria-label="Interactive map"
                onMove={evt => setViewport(evt.viewState)}
                onClick={handleMapClick}
            >
                {marker && (
                    <Marker
                        longitude={marker[0]}
                        latitude={marker[1]}
                        anchor="bottom"
                    />
                )}
                <GeolocateControl position="top-right" />
                <NavigationControl position="top-right" />
            </Map>
        </div>
    );
};

export default MapComponent;