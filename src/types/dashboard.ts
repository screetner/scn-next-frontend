import { Border } from '@/types/geolocation'

export type AssetResponse = {
  border: Border[]
  assets: Asset[]
}

export type Asset = {
  assetId: string
  geoCoordinate: number[]
  assetType: string
  recordedUser: string
  organizationName: string
}

export type IndividualAssetResponse = Asset & {
  imageUrl: string
  recordedAt: string
}
