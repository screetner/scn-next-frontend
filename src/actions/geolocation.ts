'use server'

import { Location } from '@/types/map'
import axios from '@/lib/axios'
import { CatchAxiosError } from '@/utils/CatchAxiosError'
import { GetGeolocation } from '@/types/geolocation'
import apiEndpoints from '@/config/apiEndpoints'

export const patchGeolocationOrganizationBorder = async (
  locations: Location[],
) => {
  try {
    await axios.patch(
      `${apiEndpoints.geolocation.patchGeolocationOrganizationBorder}`,
      locations,
    )
  } catch (error: any) {
    CatchAxiosError(error)
  }
}

export const getGeolocationOrganizationBorder = async () => {
  try {
    const { data } = await axios.get<GetGeolocation>(
      `${apiEndpoints.geolocation.getGeolocationOrganizationBorder}`,
    )
    return data
  } catch (err: any) {
    CatchAxiosError(err)
  }
}
