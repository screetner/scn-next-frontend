export interface Location {
  latitude: number;
  longitude: number;
}

export interface PopupData {
  location: Location;
}

export interface CustomMapProps {
  isSettingMode: boolean;
  initialViewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  popupData: PopupData[];
  locations: Location[];
  onLocationAdd?: (location: Location) => void;
  onLocationRemove?: (index: number) => void;
  width?: string;
  height?: string;
  hoveredIndex?: number | null;
}
