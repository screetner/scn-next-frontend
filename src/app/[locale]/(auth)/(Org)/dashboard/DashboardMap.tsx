'use client';

import CustomMap from '@/components/map/Map';
import { AssetResponse } from '@/types/dashboard';
import { useMemo } from 'react';
import { PopupData } from '@/types/map';
import { calculateCenter } from '@/utils/helper';

interface DashboardMapProps {
  data: AssetResponse | undefined;
}

export function DashboardMap({ data }: DashboardMapProps) {
  const popUpData: PopupData[] = useMemo(() => {
    if (data) {
      return data.assets.map(asset => {
        return {
          location: {
            latitude: asset.geoCoordinate[0],
            longitude: asset.geoCoordinate[1],
          },
        };
      });
    }
    return [];
  }, [data]);
  const center = useMemo(
    () => calculateCenter(data?.border ?? []),
    [data?.border],
  );
  return (
    <CustomMap
      isSettingMode={false}
      initialViewState={{
        longitude: center.long || 100.523186,
        latitude: center.lat || 13.736717,
        zoom: center.lat && center.long ? 15 : 1,
      }}
      popupData={popUpData}
      locations={data?.border ?? []}
    />
  );
}
