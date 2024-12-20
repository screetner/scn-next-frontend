'use server'

import { Location } from '@/types/map'
import axios from '@/lib/axios'
import { CatchAxiosError } from '@/utils/CatchAxiosError'
import { GetGeolocation } from '@/types/geolocation'
import apiEndpoints from '@/config/apiEndpoints'
import { createServerAction, ServerActionError } from '@/utils/action-utils'

export const patchGeolocationOrganizationBorder = createServerAction<void, [Location[]]>(
  async (locations) => {
    try{
      await axios.patch(
        `${apiEndpoints.geolocation.patchGeolocationOrganizationBorder}`,
        locations,
      )
    }catch(e : any){
      throw new ServerActionError(e.response?.data?.message || 'Failed to save geometry')
    }
  }
)


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
