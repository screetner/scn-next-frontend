import { Border } from '@/types/geolocation';

export interface AssetResponse {
  border: Border[];
  assets: Asset[];
}

export interface Asset {
  assetId: string;
  geoCoordinate: number[];
  assetType: string;
  recordedUser: string;
  organizationName: string;
}
