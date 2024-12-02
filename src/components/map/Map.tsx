'use client'
import React, { useState, useMemo, useRef, useCallback } from 'react'
import Map, {
  Marker,
  Source,
  Layer,
  MapRef,
  MapMouseEvent,
  SourceProps,
} from 'react-map-gl'
import { Position } from 'geojson'
import { CustomMapProps, PopupData } from '@/types/map'
import { MapPinIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Alert } from '@/components/ui/alert'
import {
  clusterCountLayer,
  clusterLayer,
  unClusteredPointLayer,
} from '@/components/map/component/ClusterLayers'
import {
  polygonFillLayer,
  polygonOutlineLayer,
} from '@/components/map/component/PolygonLayers'
import { useDrawer } from '@/context/DrawerContext'
import LocationDrawer from '@/components/drawer/Location'
import { heatmapLayer } from '@/components/map/component/heatmapLayer'

function CustomMap({
  isSettingMode = false,
  initialViewState,
  popupData = [],
  locations = [],
  onLocationAdd,
  onLocationRemove,
  hoveredIndex,
}: CustomMapProps) {
  const { theme } = useTheme()
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAP_API_KEY
  const [selectedPopup, setSelectedPopup] = useState<PopupData | null>(null)
  const mapRef = useRef<MapRef>(null)
  const { showDrawer } = useDrawer()

  const openDrawer = () => {
    showDrawer({
      id: 'custom-drawer',
      title: 'Location Details',
      content: <LocationDrawer />, // This is the component that will be rendered inside the drawer
    })
  }

  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      if (!isSettingMode) {
        //   marker click
      } else if (onLocationAdd) {
        // Add new location in setting mode
        const clickedLocation = {
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
        }
        onLocationAdd(clickedLocation)
      }
    },
    [isSettingMode, onLocationAdd],
  )

  const features = useMemo(
    () =>
      popupData?.map((data, index) => ({
        type: 'Feature' as const,
        properties: {
          ...data,
          index,
          // Add a density property (you can customize this logic)
          density: calculateDensity(data, popupData),
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [
            data.location.longitude,
            data.location.latitude,
          ] as Position,
        },
      })),
    [popupData],
  )

  // Optional: Density calculation function
  function calculateDensity(point: PopupData, allPoints: PopupData[]): number {
    // Simple proximity-based density calculation
    const radius = 0.1 // Adjust this value to control density calculation
    const nearbyPoints = allPoints.filter(
      p => calculateDistance(point.location, p.location) <= radius,
    )
    return nearbyPoints.length / allPoints.length
  }

  // Haversine formula for distance calculation
  function calculateDistance(
    loc1: { longitude: number; latitude: number },
    loc2: { longitude: number; latitude: number },
  ): number {
    const R = 6371 // Radius of the Earth in km
    const dLat = ((loc2.latitude - loc1.latitude) * Math.PI) / 180
    const dLon = ((loc2.longitude - loc1.longitude) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((loc1.latitude * Math.PI) / 180) *
        Math.cos((loc2.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Memoize GeoJSON data
  const geoJsonData: SourceProps['data'] = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: features || [],
    }),
    [features],
  )

  // Memoize polygon data with proper typing
  const polygonData = useMemo(
    () => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Polygon' as const,
        coordinates: [
          locations.length > 2
            ? [
                ...locations.map(
                  loc => [loc.longitude, loc.latitude] as Position,
                ),
                // Close the polygon by adding the first point again
                [locations[0].longitude, locations[0].latitude] as Position,
              ]
            : [],
        ],
      },
    }),
    [locations],
  )

  // Handle marker removal with proper event handling
  const handleMarkerRemove = useCallback(
    (index: number, e: React.MouseEvent) => {
      e.stopPropagation()
      if (onLocationRemove) {
        onLocationRemove(index)
      }
    },
    [onLocationRemove],
  )

  if (!mapboxAccessToken) {
    return (
      <Alert variant="destructive">
        Please provide your mapbox access token in the .env file to use the map
        feature
      </Alert>
    )
  }

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={mapboxAccessToken}
      initialViewState={initialViewState}
      style={{ width: '100%', height: '100%' }}
      mapStyle={
        theme === 'dark'
          ? 'mapbox://styles/mapbox/dark-v11?optimize=true'
          : 'mapbox://styles/mapbox/light-v11?optimize=true'
      }
      interactiveLayerIds={[
        clusterLayer.id!,
        clusterCountLayer.id!,
        unClusteredPointLayer.id!,
      ]}
      onClick={handleMapClick}
    >
      {/* Polygon Layer */}
      {locations.length > 2 && (
        <Source id="polygon" type="geojson" data={polygonData}>
          <Layer {...polygonFillLayer} />
          <Layer {...polygonOutlineLayer} />
        </Source>
      )}

      {/* Setting Mode Markers */}
      {isSettingMode &&
        locations.map((location, index) => (
          <Marker
            key={`marker-${index}`}
            longitude={location.longitude}
            latitude={location.latitude}
          >
            <div
              className={`
                text-2xl cursor-pointer transition-all duration-300
                ${hoveredIndex === index ? 'text-blue-500 scale-125 -translate-y-1' : 'text-red-500'}
                ${hoveredIndex === index ? 'filter drop-shadow-md' : ''}
              `}
              onClick={e => handleMarkerRemove(index, e)}
            >
              <MapPinIcon />
            </div>
          </Marker>
        ))}

      {/* Clustered Markers */}
      {popupData && popupData.length > 0 && (
        <Source id="markers" type="geojson" data={geoJsonData}>
          <Layer {...heatmapLayer} />
        </Source>
      )}
    </Map>
  )
}

export default React.memo(CustomMap)
