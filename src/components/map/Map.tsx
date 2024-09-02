'use client'
import React, { useState, useMemo, useRef, useEffect } from 'react'
import Map, { Marker, Source, Layer, Popup, MapRef } from 'react-map-gl'
import { CustomMapProps, PopupData } from '@/types/map'
import { Dot, MapPinIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'

function CustomMap({
  isSettingMode,
  initialViewState,
  popupData,
  locations,
  onLocationAdd,
  onLocationRemove,
  hoveredIndex,
}: CustomMapProps) {
  const { theme } = useTheme()
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAP_API_KEY
  const [selectedPopup, setSelectedPopup] = useState<PopupData | null>(null)
  const mapRef = useRef<MapRef>(null)

  const handleMapClick = (event: mapboxgl.MapLayerMouseEvent) => {
    if (!isSettingMode || !onLocationAdd) return
    const newLocation = {
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    }
    onLocationAdd(newLocation)
  }

  const polygonData = useMemo(
    () => ({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          locations.length > 2
            ? [
                ...locations.map(loc => [loc.longitude, loc.latitude]),
                [locations[0].longitude, locations[0].latitude],
              ]
            : [],
        ],
      },
    }),
    [locations],
  )

  useEffect(() => {
    if (mapRef.current && locations.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()
      locations.forEach(location => {
        bounds.extend([location.longitude, location.latitude])
      })
      mapRef.current.fitBounds(bounds, { padding: 40, duration: 1000 })
    }
  }, [locations])

  if (!mapboxAccessToken) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading map...
      </div>
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
            ? 'mapbox://styles/mapbox/dark-v11'
            : 'mapbox://styles/mapbox/light-v11'
        }
        onClick={handleMapClick}
      >
        <Source id="polygon" type="geojson" data={polygonData}>
          <Layer
            id="polygon"
            type="fill"
            paint={{
              'fill-color': '#088',
              'fill-opacity': 0.3,
            }}
          />
          <Layer
            id="polygon-outline"
            type="line"
            paint={{
              'line-color': '#088',
              'line-width': 2,
            }}
          />
        </Source>

        {isSettingMode &&
          locations.map((location, index) => (
            <Marker
              key={index}
              longitude={location.longitude}
              latitude={location.latitude}
            >
              <div
                className={`
                  text-2xl cursor-pointer transition-all duration-300
                  ${hoveredIndex === index ? 'text-blue-500 scale-125 -translate-y-1' : 'text-red-500'}
                  ${hoveredIndex === index ? 'filter drop-shadow-md' : ''}
                `}
                onClick={e => {
                  e.stopPropagation()
                  if (onLocationRemove) onLocationRemove(index)
                }}
              >
                <MapPinIcon />
              </div>
            </Marker>
          ))}

        {!isSettingMode &&
          popupData &&
          popupData.map((data, index) => (
            <Marker
              key={`popup-${index}`}
              longitude={data.location.longitude}
              latitude={data.location.latitude}
              onClick={() => {
                setSelectedPopup(data)
              }}
            >
              <Dot className="text-red-500" />
            </Marker>
          ))}

        {selectedPopup && (
          <Popup
            longitude={selectedPopup.location.longitude}
            latitude={selectedPopup.location.latitude}
            onClose={() => setSelectedPopup(null)}
            closeOnClick={false}
          >
            <div className="p-2">{selectedPopup.content}</div>
          </Popup>
        )}
      </Map>
    </div>
  )
}

export default CustomMap
