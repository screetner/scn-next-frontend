"use client"

import { useState, useCallback, useEffect, useMemo } from 'react';
import Map, { Marker, Source, Layer, Popup } from 'react-map-gl';
import { CustomMapProps, Location, PopupData } from "@/types/map";
import { Dot, MapPinCheckInside } from "lucide-react";

function CustomMap({
                       isSettingMode,
                       initialViewState,
                       popupData,
                       initialGeometry = [],
                       onGeometryChange,
                       width = "100%",
                       height = "600px",
                       hoveredIndex
                   }: CustomMapProps) {
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAP_API_KEY;
    const [locations, setLocations] = useState<Location[]>(initialGeometry);
    const [selectedPopup, setSelectedPopup] = useState<PopupData | null>(null);

    useEffect(() => {
        setLocations(initialGeometry);
    }, [initialGeometry]);

    const handleMapClick = useCallback((event: any) => {
        if (!isSettingMode) return;

        const newLocation = {long: event.lngLat.lng, lat: event.lngLat.lat};
        setLocations(prevLocations => {
            const updatedLocations = [...prevLocations, newLocation];
            if (onGeometryChange) {
                onGeometryChange(updatedLocations);
            }
            return updatedLocations;
        });
    }, [isSettingMode, onGeometryChange]);

    const handleMarkerRemove = useCallback((index: number) => {
        setLocations(prevLocations => {
            const updatedLocations = prevLocations.filter((_, i) => i !== index);
            if (onGeometryChange) {
                onGeometryChange(updatedLocations);
            }
            return updatedLocations;
        });
    }, [onGeometryChange]);

    const polygonData = useMemo(() => ({
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [locations.length > 2 ? [...locations.map(loc => [loc.long, loc.lat]), [locations[0].long, locations[0].lat]] : []]
        }
    }), [locations]);

    if (!mapboxAccessToken) {
        return <div>Loading map...</div>;
    }

    return (
        <div style={{ width: width, height: height }}>
            <Map
                mapboxAccessToken={mapboxAccessToken}
                initialViewState={initialViewState}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onClick={handleMapClick}
            >
                <Source id="polygon" type="geojson" data={polygonData}>
                    <Layer
                        id="polygon"
                        type="fill"
                        paint={{
                            'fill-color': '#088',
                            'fill-opacity': 0.3
                        }}
                    />
                    <Layer
                        id="polygon-outline"
                        type="line"
                        paint={{
                            'line-color': '#088',
                            'line-width': 2
                        }}
                    />
                </Source>

                {isSettingMode && locations.map((location, index) => (
                    <Marker
                        key={index}
                        longitude={location.long}
                        latitude={location.lat}
                    >
                        <div
                            style={{
                                color: hoveredIndex === index ? '#3b82f6' : '#ef4444',
                                fontSize: '24px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                transform: hoveredIndex === index ? 'scale(1.2) translateY(-5px)' : 'scale(1)',
                                filter: hoveredIndex === index ? 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))' : 'none'
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMarkerRemove(index);
                            }}
                        >
                            <MapPinCheckInside />
                        </div>
                    </Marker>
                ))}

                {!isSettingMode && popupData && popupData.map((data, index) => (
                    <Marker
                        key={`popup-${index}`}
                        longitude={data.location.long}
                        latitude={data.location.lat}
                        onClick={() => {
                            setSelectedPopup(data);
                        }}
                    >
                        <Dot />
                    </Marker>
                ))}

                {selectedPopup && (
                    <Popup
                        longitude={selectedPopup.location.long}
                        latitude={selectedPopup.location.lat}
                        onClose={() => setSelectedPopup(null)}
                        closeOnClick={false}
                    >
                        {selectedPopup.content}
                    </Popup>
                )}
            </Map>
        </div>
    );
}

export default CustomMap;