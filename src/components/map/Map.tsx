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
import { unClusteredPointLayer } from '@/components/map/component/ClusterLayers'
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
}: CustomMapProps) {
  const ZOOM_THRESHOLD = 16
  const { theme } = useTheme()
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAP_API_KEY
  const [currentZoom, setCurrentZoom] = useState(0) // Track zoom level
  const mapRef = useRef<MapRef>(null)
  const { showDrawer } = useDrawer()

  const openDrawer = useCallback(
    (location: PopupData) => {
      showDrawer({
        id: 'custom-drawer',
        title: 'Location Details',
        content: <LocationDrawer data={location} />, // This is the component that will be rendered inside the drawer
      })
    },
    [showDrawer], // Removed currentZoom from dependency array
  )

  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      if (!isSettingMode) {
        if (currentZoom < ZOOM_THRESHOLD) return
        const features = mapRef.current?.queryRenderedFeatures(event.point, {
          layers: ['unClustered-point'],
        })
        if (features?.length) {
          const clickedFeature = features[0]
          const clickedIndex: number = clickedFeature.properties?.index
          openDrawer(popupData[clickedIndex])
        }
      } else if (onLocationAdd) {
        // Add new location in setting mode
        const clickedLocation = {
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
        }
        onLocationAdd(clickedLocation)
      }
    },
    [currentZoom, isSettingMode, onLocationAdd, openDrawer, popupData],
  )

  const features = useMemo(() => {
    function calculateDensity(
      point: PopupData,
      allPoints: PopupData[],
    ): number {
      const radius = 0.1
      const nearbyPoints = allPoints.filter(
        p => calculateDistance(point.location, p.location) <= radius,
      )
      return nearbyPoints.length / allPoints.length
    }

    return popupData?.map((data, index) => ({
      type: 'Feature' as const,
      properties: {
        ...data,
        index,
        density: calculateDensity(data, popupData),
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [
          data.location.longitude,
          data.location.latitude,
        ] as Position,
      },
    }))
  }, [popupData])

  function calculateDistance(
    loc1: { longitude: number; latitude: number },
    loc2: { longitude: number; latitude: number },
  ): number {
    const R = 6371
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

  const geoJsonData: SourceProps['data'] = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: features || [],
    }),
    [features],
  )

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
                [locations[0].longitude, locations[0].latitude] as Position,
              ]
            : [],
        ],
      },
    }),
    [locations],
  )

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
      interactiveLayerIds={['unclustered-point-layer']}
      onClick={handleMapClick}
      onZoom={e => setCurrentZoom(e.target.getZoom())}
    >
      {locations.length > 2 && (
        <Source id="polygon" type="geojson" data={polygonData}>
          <Layer {...polygonFillLayer} />
          <Layer {...polygonOutlineLayer} />
        </Source>
      )}

      {isSettingMode &&
        locations.map((location, index) => (
          <Marker
            key={`marker-${index}`}
            longitude={location.longitude}
            latitude={location.latitude}
          >
            <div
              className="text-2xl cursor-pointer text-red-500 transition-all duration-300"
              onClick={e => handleMarkerRemove(index, e)}
            >
              <MapPinIcon />
            </div>
          </Marker>
        ))}

      {popupData.length > 0 && (
        <Source id="markers" type="geojson" data={geoJsonData}>
          {currentZoom >= ZOOM_THRESHOLD && (
            <Layer {...unClusteredPointLayer} />
          )}
          <Layer {...heatmapLayer} />
        </Source>
      )}
    </Map>
  )
}

export default React.memo(CustomMap)
