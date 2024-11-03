'use client'
import React, { useState, useMemo, useRef, useCallback } from 'react'
import Map, {
  Marker,
  Source,
  Layer,
  MapRef,
  MapMouseEvent,
  GeoJSONSource,
  SourceProps,
} from 'react-map-gl'
import { Point, Position } from 'geojson'
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

  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      if (!isSettingMode) {
        // Handle cluster click
        if (event.features && event.features.length > 0) {
          const feature = event.features[0]
          const clusterId = feature.properties?.cluster_id

          const mapboxSource = mapRef.current?.getSource('markers') as
            | GeoJSONSource
            | undefined

          if (clusterId && mapboxSource) {
            mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return

              const geometry = feature.geometry as Point
              if (geometry.type === 'Point') {
                mapRef.current?.easeTo({
                  center: geometry.coordinates as [number, number],
                  zoom: zoom || 0,
                  duration: 500,
                })
              }
            })
          } else if (feature.properties) {
            // Handle single point click
            console.log('Selected popup:', feature.properties)
            setSelectedPopup(feature.properties as PopupData)
          }
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
    [isSettingMode, onLocationAdd],
  )

  // Memoize features for better performance
  const features = useMemo(
    () =>
      popupData?.map((data, index) => ({
        type: 'Feature' as const,
        properties: { ...data, index },
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
    // <div className="w-full h-full">
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
        <Source
          id="markers"
          type="geojson"
          data={geoJsonData}
          cluster={true}
          clusterMaxZoom={20}
          clusterRadius={35}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unClusteredPointLayer} />
        </Source>
      )}
    </Map>
    // </div>
  )
}

export default React.memo(CustomMap)
