import { Location } from '@/types/map'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Map from '@/components/map/Map'
import React, { useMemo } from 'react'
import { calculateCenter } from '@/utils/helper'

interface orgMapProps {
  borders: Location[]
}

export default function OrgMap({ borders }: orgMapProps) {
  const center = useMemo(() => calculateCenter(borders ?? []), [borders])
  return (
    <>
      <Card className={'hidden lg:block'}>
        <CardHeader>
          <CardTitle>Organization border</CardTitle>
        </CardHeader>
        <CardContent className={'h-[80%]'}>
          <Map
            isSettingMode={false}
            popupData={[]}
            locations={[
              { longitude: 98.97849483131057, latitude: 18.795812641568034 },
              { longitude: 98.98600860479195, latitude: 18.79808881339615 },
              { longitude: 98.99377999336423, latitude: 18.79516230110697 },
              { longitude: 98.99274953300068, latitude: 18.781423271878722 },
              { longitude: 98.97776492188694, latitude: 18.78158587049316 },
              { longitude: 98.97849483131057, latitude: 18.795812641568034 },
            ]}
            initialViewState={{
              longitude: center.long || 100.523186,
              latitude: center.lat || 13.736717,
              zoom: center.lat && center.long ? 14 : 1,
            }}
          />
        </CardContent>
      </Card>
    </>
  )
}
