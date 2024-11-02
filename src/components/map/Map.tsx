'use client'
import React, { useState, useMemo, useRef, useCallback } from 'react'
import Map, {
  Marker,
  Source,
  Layer,
  MapRef,
  MapMouseEvent,
  GeoJSONSource,
  SourceProps
} from 'react-map-gl'
import { Point, Position } from 'geojson'
import { CustomMapProps, PopupData } from '@/types/map'
import { MapPinIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Alert } from '@/components/ui/alert'
import { clusterCountLayer, clusterLayer, unClusteredPointLayer } from '@/components/map/component/ClusterLayers'
import { polygonFillLayer, polygonOutlineLayer } from '@/components/map/component/PolygonLayers'

function CustomMap({
                     isSettingMode = false,
                     initialViewState,
                     // popupData = [],
                     locations = [],
                     onLocationAdd,
                     onLocationRemove,
                     hoveredIndex,
                   }: CustomMapProps) {
  const popupData : PopupData[] = [{'location': {'latitude': 18.789126, 'longitude': 98.986819}}, {'location': {'latitude': 18.78749, 'longitude': 98.98675}}, {'location': {'latitude': 18.785329, 'longitude': 98.986195}}, {'location': {'latitude': 18.786801, 'longitude': 98.98875}}, {'location': {'latitude': 18.784208, 'longitude': 98.986405}}, {'location': {'latitude': 18.788186, 'longitude': 98.987467}}, {'location': {'latitude': 18.786718, 'longitude': 98.986436}}, {'location': {'latitude': 18.790548, 'longitude': 98.984723}}, {'location': {'latitude': 18.786294, 'longitude': 98.988073}}, {'location': {'latitude': 18.787453, 'longitude': 98.9834}}, {'location': {'latitude': 18.788048, 'longitude': 98.986045}}, {'location': {'latitude': 18.787145, 'longitude': 98.989401}}, {'location': {'latitude': 18.78754, 'longitude': 98.986307}}, {'location': {'latitude': 18.787945, 'longitude': 98.989033}}, {'location': {'latitude': 18.784042, 'longitude': 98.984009}}, {'location': {'latitude': 18.784967, 'longitude': 98.985117}}, {'location': {'latitude': 18.788237, 'longitude': 98.987227}}, {'location': {'latitude': 18.788266, 'longitude': 98.983484}}, {'location': {'latitude': 18.788316, 'longitude': 98.984006}}, {'location': {'latitude': 18.787047, 'longitude': 98.986568}}, {'location': {'latitude': 18.790568, 'longitude': 98.989602}}, {'location': {'latitude': 18.790492, 'longitude': 98.984075}}, {'location': {'latitude': 18.787624, 'longitude': 98.985242}}, {'location': {'latitude': 18.787917, 'longitude': 98.984427}}, {'location': {'latitude': 18.792437, 'longitude': 98.986228}}, {'location': {'latitude': 18.788445, 'longitude': 98.982207}}, {'location': {'latitude': 18.786546, 'longitude': 98.98671}}, {'location': {'latitude': 18.789774, 'longitude': 98.988533}}, {'location': {'latitude': 18.789401, 'longitude': 98.987897}}, {'location': {'latitude': 18.78842, 'longitude': 98.986647}}, {'location': {'latitude': 18.786637, 'longitude': 98.987388}}, {'location': {'latitude': 18.79019, 'longitude': 98.985147}}, {'location': {'latitude': 18.787885, 'longitude': 98.986689}}, {'location': {'latitude': 18.792, 'longitude': 98.985318}}, {'location': {'latitude': 18.787599, 'longitude': 98.986495}}, {'location': {'latitude': 18.789338, 'longitude': 98.984364}}, {'location': {'latitude': 18.786627, 'longitude': 98.983135}}, {'location': {'latitude': 18.785769, 'longitude': 98.984092}}, {'location': {'latitude': 18.783791, 'longitude': 98.984833}}, {'location': {'latitude': 18.786891, 'longitude': 98.986549}}, {'location': {'latitude': 18.787989, 'longitude': 98.9859}}, {'location': {'latitude': 18.790113, 'longitude': 98.987465}}, {'location': {'latitude': 18.787312, 'longitude': 98.987627}}, {'location': {'latitude': 18.788683, 'longitude': 98.98603}}, {'location': {'latitude': 18.787999, 'longitude': 98.986}}, {'location': {'latitude': 18.785377, 'longitude': 98.988841}}, {'location': {'latitude': 18.784586, 'longitude': 98.984435}}, {'location': {'latitude': 18.786382, 'longitude': 98.986782}}, {'location': {'latitude': 18.787335, 'longitude': 98.986397}}, {'location': {'latitude': 18.787559, 'longitude': 98.989462}}]

  const { theme } = useTheme()
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAP_API_KEY
  const [selectedPopup, setSelectedPopup] = useState<PopupData | null>(null)
  const mapRef = useRef<MapRef>(null)

  const handleMapClick = useCallback((event: MapMouseEvent) => {
    if (!isSettingMode) {
      // Handle cluster click
      if (event.features && event.features.length > 0) {
        const feature = event.features[0]
        const clusterId = feature.properties?.cluster_id

        const mapboxSource = mapRef.current?.getSource('markers') as GeoJSONSource | undefined

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
  }, [isSettingMode, onLocationAdd])

  // Memoize features for better performance
  const features = useMemo(() =>
      popupData?.map((data, index) => ({
        type: 'Feature' as const,
        properties: { ...data, index },
        geometry: {
          type: 'Point' as const,
          coordinates: [data.location.longitude, data.location.latitude] as Position,
        },
      })),
    [popupData]
  )

  // Memoize GeoJSON data
  const geoJsonData: SourceProps['data'] = useMemo(() => ({
    type: 'FeatureCollection',
    features: features || [],
  }), [features])

  // Memoize polygon data with proper typing
  const polygonData = useMemo(() => ({
    type: 'Feature' as const,
    geometry: {
      type: 'Polygon' as const,
      coordinates: [
        locations.length > 2
          ? [
            ...locations.map(loc => [loc.longitude, loc.latitude] as Position),
            // Close the polygon by adding the first point again
            [locations[0].longitude, locations[0].latitude] as Position,
          ]
          : [],
      ],
    },
  }), [locations])

  // Handle marker removal with proper event handling
  const handleMarkerRemove = useCallback((index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (onLocationRemove) {
      onLocationRemove(index)
    }
  }, [onLocationRemove])

  if (!mapboxAccessToken) {
    return (
      <Alert variant="destructive">
        Please provide your mapbox access token in the .env file to use the map feature
      </Alert>
    )
  }

  return (
    <div className="w-full h-full">
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
            <Layer {...polygonFillLayer}/>
            <Layer {...polygonOutlineLayer} />
          </Source>
        )}

        {/* Setting Mode Markers */}
        {isSettingMode && locations.map((location, index) => (
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
              onClick={(e) => handleMarkerRemove(index, e)}
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
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unClusteredPointLayer} />
          </Source>
        )}
      </Map>
    </div>
  )
}

// export default  React.memo(CustomMap)

export default CustomMap