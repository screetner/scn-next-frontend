'use server'

import { CatchAxiosError } from '@/utils/CatchAxiosError'
import axios from '@/lib/axios'
import { actionResponse } from '@/types/reponse'
import { OrganizationAll } from '@/types/owner/organization'

export async function getAllOrganization(): Promise<
  actionResponse<OrganizationAll[]>
> {
  try {
    const { data } = await axios.get(`/organization/all`)
    return {
      data: data,
      error: null,
    }
  } catch (e) {
    return {
      data: null,
      error: CatchAxiosError(e),
    }
  }
}
