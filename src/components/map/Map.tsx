"use client"

import { useState, useMemo } from 'react';
import Map, { Marker, Source, Layer, Popup } from 'react-map-gl';
import { CustomMapProps, PopupData } from "@/types/map";
import { Dot, MapPinCheckInside } from "lucide-react";
import { useTheme } from "next-themes";

function CustomMap({
                       isSettingMode,
                       initialViewState,
                       popupData,
                       locations,
                       onLocationAdd,
                       onLocationRemove,
                       width = "100%",
                       height = "600px",
                       hoveredIndex
                   }: CustomMapProps) {
    const { theme } = useTheme()
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAP_API_KEY;
    const [selectedPopup, setSelectedPopup] = useState<PopupData | null>(null);

    const handleMapClick = (event: any) => {
        if (!isSettingMode || !onLocationAdd) return;
        const newLocation = { longitude: event.lngLat.lng, latitude: event.lngLat.lat };
        onLocationAdd(newLocation);
    };

    const polygonData = useMemo(() => ({
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [locations.length > 2 ? [...locations.map(loc => [loc.longitude, loc.latitude]), [locations[0].longitude, locations[0].latitude]] : []]
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
                mapStyle={theme === "dark" ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11"}
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
                        longitude={location.longitude}
                        latitude={location.latitude}
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
                                if (onLocationRemove) onLocationRemove(index);
                            }}
                        >
                            <MapPinCheckInside />
                        </div>
                    </Marker>
                ))}

                {!isSettingMode && popupData && popupData.map((data, index) => (
                    <Marker
                        key={`popup-${index}`}
                        longitude={data.location.longitude}
                        latitude={data.location.latitude}
                        onClick={() => {
                            setSelectedPopup(data);
                        }}
                    >
                        <Dot color={"red"}/>
                    </Marker>
                ))}

                {selectedPopup && (
                    <Popup
                        longitude={selectedPopup.location.longitude}
                        latitude={selectedPopup.location.latitude}
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