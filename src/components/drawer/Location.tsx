'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Type, User, Calendar } from 'lucide-react'
import Image from 'next/image'
import { PopupData } from '@/types/map'
import { useFetchAsset } from '@/hooks/asset/uesFetchAsset'

interface LocationDrawerProps {
  data: PopupData
}

export default function LocationDrawer({ data }: LocationDrawerProps) {
  const { data: assetData, isLoading } = useFetchAsset({
    assetId: data.assetId,
  })

  if (isLoading) return <div>Loading...</div>

  if (!assetData) return <div>No asset data found</div>

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="w-full aspect-video relative mb-4">
          <Image
            src={assetData.imageUrl || '/api/placeholder/400/300'}
            alt={`Detected ${assetData.assetType}`}
            fill
            className="object-contain border-2 border-primary rounded-lg"
          />
        </div>
        <CardTitle>{assetData.assetType}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Asset ID: {assetData.assetId}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>{assetData.recordedUser}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{new Date(assetData.recordedAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>
              Coordinates:
              {assetData.geoCoordinate
                .map(coord => coord.toFixed(4))
                .join(', ')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Type className="w-4 h-4 text-muted-foreground" />
            <Badge variant="secondary">{assetData.assetType}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
