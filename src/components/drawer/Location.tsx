'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Type, User, Calendar } from 'lucide-react'
import Image from 'next/image'
import { PopupData } from '@/types/map'
import { useFetchAsset } from '@/hooks/asset/uesFetchAsset'
import { Separator } from '@/components/ui/separator'
import LoadingFramer from '@/components/LoadingFramer'
import { Link } from '@/i18n/routing'

interface LocationDrawerProps {
  data: PopupData
}

export default function LocationDrawer({ data }: LocationDrawerProps) {
  const { data: assetData, isLoading } = useFetchAsset({
    assetId: data.assetId,
  })

  const [isImageLoading, setIsImageLoading] = useState(true)

  const handleImageLoad = () => {
    setIsImageLoading(false)
  }

  if (isLoading) return <LoadingFramer width="100%" height="100%" />

  if (!assetData) return <div>No asset data found</div>

  return (
    <>
      <Card className="w-full max-w-full flex flex-col xl:flex-row p-5">
        {/* Image Section */}
        <div className="w-full xl:w-[70%] relative aspect-video mb-4 xl:mb-0">
          {/* Show Skeleton while Image is Loading */}
          {isImageLoading && <LoadingFramer width="100%" height="100%" />}

          {/* Image Component */}
          <Image
            src={assetData.imageUrl || '/api/placeholder/400/300'}
            alt={`Detected ${assetData.assetType}`}
            fill
            className="object-cover border-2 border-primary rounded-xl"
            onLoad={handleImageLoad}
          />
        </div>

        {/* Information Section */}
        <div className="w-full xl:w-[30%] xl:pl-4 flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start xl:items-center space-y-2 xl:space-y-0">
              <div>
                <CardTitle>{assetData.assetType}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Asset ID: {assetData.assetId}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <Link
                  href={`https://www.google.com/maps?q=${assetData.geoCoordinate[0]},${assetData.geoCoordinate[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View on Map
                </Link>
              </div>
            </div>

            <Separator className="mt-2" />
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
                <Type className="w-4 h-4 text-muted-foreground" />
                <Badge variant="secondary">{assetData.assetType}</Badge>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  )
}
