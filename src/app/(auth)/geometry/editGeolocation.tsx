'use client';

import CustomMap from '@/components/map/Map';
import { LocationList } from '@/components/map/LocationList';
import { useCallback, useMemo, useState } from 'react';
import { Location } from '@/types/map';
import * as action from '@/actions';
import { toast } from 'sonner';
import { calculateCenter } from '@/utils/helper';

interface EditGeolocationProps {
  Locations: Location[];
}
export default function EditGeolocation({ Locations }: EditGeolocationProps) {
  const [savedGeometry, setSavedGeometry] = useState<Location[]>(Locations);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const center = useMemo(() => calculateCenter(savedGeometry), [savedGeometry]);

  const handleLocationAdd = useCallback((newLocation: Location) => {
    setSavedGeometry(prev => [...prev, newLocation]);
  }, []);

  const handleLocationRemove = useCallback((index: number) => {
    setSavedGeometry(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleClearAll = useCallback(() => {
    setSavedGeometry([]);
  }, []);

  const handleSave = async () => {
    toast.promise(action.patchGeolocationOrganizationBorder(savedGeometry), {
      loading: 'Saving...',
      success: 'Successfully saved!',
      error: err => err.message || 'Failed to save geometry',
    });
  };

  return (
    <>
      <div className="w-full md:w-3/4 h-full">
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
          height="100%"
          hoveredIndex={hoveredIndex}
        />
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
  );
}
