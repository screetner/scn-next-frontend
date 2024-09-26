'use server'
import EditGeolocation from '@/app/[locale]/(auth)/(Org)/geometry/editGeolocation'
import { getGeolocationOrganizationBorder } from '@/actions/geolocation'

export default async function Geometry() {
  const geolocation = await getGeolocationOrganizationBorder()
  return (
    <div className="flex flex-col md:flex-row h-full gap-2">
      <EditGeolocation Locations={geolocation?.border ?? []} />
    </div>
  )
}
