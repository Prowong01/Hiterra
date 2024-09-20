'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Map, { Marker, MapRef, GeolocateControl, NavigationControl } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

interface MapComponentProps {
    onLocationSelect: (lat: number, lng: number) => void;
    initialLocation: [number, number] | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect, initialLocation  }) => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [marker, setMarker] = useState<[number, number] | null>(null);
    const [viewport, setViewport] = useState({
        longitude: 101.6869,
        latitude: 3.14,
        zoom: 3.5
    });

    const mapRef = useRef<MapRef>(null);
    const geocoderContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (initialLocation) {
            setMarker(initialLocation);
            setViewport({
                longitude: initialLocation[0],
                latitude: initialLocation[1],
                zoom: 12
            });
        }
    }, [initialLocation]);

    const handleMapClick = useCallback((event: mapboxgl.MapLayerMouseEvent) => {
        const [lng, lat] = event.lngLat.toArray();
        setMarker([lng, lat]);
        onLocationSelect(lat, lng);
    }, [onLocationSelect]);

    useEffect(() => {
        if (isMapLoaded && mapRef.current && geocoderContainerRef.current) {
            const geocoder = new MapboxGeocoder({
                accessToken: 'pk.eyJ1IjoicHJvd29uZyIsImEiOiJjbTEzbmY0ajAwcTA1MnNxMWsyY2RwZGF3In0.1qBSnkB_sKp4KNVcpDbdtw',
                mapboxgl: mapboxgl,
            });

            geocoderContainerRef.current.appendChild(geocoder.onAdd(mapRef.current.getMap()));

            setViewport(prev => ({ ...prev }));

            geocoder.on('result', (e: any) => {
                const { center, bbox } = e.result;
                // setMarker(center);
                // onLocationSelect(center[1], center[0]);

                if (bbox) {
                    const [minLng, minLat, maxLng, maxLat] = bbox;
                    const zoom = Math.min(
                        Math.log2(360 / (maxLng - minLng)),
                        Math.log2(180 / (maxLat - minLat))
                    ) - 1;

                    setViewport({
                        longitude: (minLng + maxLng) / 2,
                        latitude: (minLat + maxLat) / 2,
                        zoom: zoom
                    });
                } else {
                    setViewport({
                        longitude: center[0],
                        latitude: center[1],
                        zoom: 12
                    });
                }
            });

            return () => {
                if (geocoderContainerRef.current && geocoderContainerRef.current.firstChild) {
                    geocoderContainerRef.current.removeChild(geocoderContainerRef.current.firstChild);
                }
            };
        }
    }, [isMapLoaded, onLocationSelect]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <div ref={geocoderContainerRef} style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }} />
            <Map
                ref={mapRef}
                mapboxAccessToken='pk.eyJ1IjoicHJvd29uZyIsImEiOiJjbTEzbmY0ajAwcTA1MnNxMWsyY2RwZGF3In0.1qBSnkB_sKp4KNVcpDbdtw'
                {...viewport}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapLib={mapboxgl}
                aria-label="Interactive map"
                onMove={evt => setViewport(evt.viewState)}
                onClick={handleMapClick}
                onLoad={() => setIsMapLoaded(true)}
            >
                {marker && (
                    <Marker
                        longitude={marker[0]}
                        latitude={marker[1]}
                        anchor="bottom"
                    >
                        <div style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: '25px'
                        }}>
                            📍
                        </div>
                    </Marker>
                )}
                <GeolocateControl position="top-right" />
                <NavigationControl position="top-right" />
            </Map>
        </div>
    );
};

export default MapComponent;