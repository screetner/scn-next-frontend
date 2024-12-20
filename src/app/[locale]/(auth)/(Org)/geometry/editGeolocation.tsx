'use client'

import CustomMap from '@/components/map/Map'
import { LocationList } from '@/components/map/LocationList'
import { useCallback, useMemo, useState } from 'react'
import { Location } from '@/types/map'
import { calculateCenter } from '@/utils/helper'
import { Card, CardContent } from '@/components/ui/card'
import { patchGeolocationOrganizationBorder } from '@/actions/geolocation'
import { withToastPromise } from '@/utils/toastPromise'

interface EditGeolocationProps {
  Locations: Location[]
}
export default function EditGeolocation({ Locations }: EditGeolocationProps) {
  const [savedGeometry, setSavedGeometry] = useState<Location[]>(Locations)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const center = useMemo(() => calculateCenter(savedGeometry), [savedGeometry])

  const handleLocationAdd = useCallback((newLocation: Location) => {
    setSavedGeometry(prev => [...prev, newLocation])
  }, [])

  const handleLocationRemove = useCallback((index: number) => {
    setSavedGeometry(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleClearAll = useCallback(() => {
    setSavedGeometry([])
  }, [])

  const handleSave = async () => {
    await withToastPromise(() => patchGeolocationOrganizationBorder(savedGeometry), {
      loading: 'Saving...',
      success: 'Successfully saved!',
      error: err => err.message || 'Failed to save geometry',
    })
  }

  const Map = useMemo(() => {
    return (
      <CustomMap
        isSettingMode={true}
        initialViewState={{
          longitude: center.long || 100.523186,
          latitude: center.lat || 13.736717,
          zoom: center.lat && center.long ? 14 : 1,
        }}
        popupData={[]}
        locations={savedGeometry}
        onLocationAdd={handleLocationAdd}
        onLocationRemove={handleLocationRemove}
        hoveredIndex={hoveredIndex}
      />
    )
  }, [
    center.long,
    center.lat,
    savedGeometry,
    handleLocationAdd,
    handleLocationRemove,
    hoveredIndex,
  ])

  return (
    <>
      <div className="w-full md:w-3/4 h-full">
        <Card className="h-full">
          <CardContent className="p-0 h-full">{Map}</CardContent>
        </Card>
      </div>
      <div className="overflow-y-auto md:w-1/4 h-full max-h-full">
        <LocationList
          locations={savedGeometry}
          onHover={setHoveredIndex}
          onDelete={handleLocationRemove}
          onClearAll={handleClearAll}
          onSave={handleSave}
        />
      </div>
    </>
  )
}
