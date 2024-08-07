import React from "react";

export interface Location {
    long: number;
    lat: number;
}

export interface PopupData {
    location: Location;
    content: React.ReactNode;
}

export interface CustomMapProps {
    width?: string;
    height?: string;
    fullscreenControl?: boolean;
    isSettingMode: boolean;
    initialViewState: {
        longitude: number;
        latitude: number;
        zoom: number;
    };
    popupData?: PopupData[];
    initialGeometry?: Location[];
    onGeometryChange?: (geometry: Location[]) => void;
    hoveredIndex: number | null;
}