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
            locations={borders}
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
