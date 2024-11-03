'use server'

import { CatchAxiosError } from '@/utils/CatchAxiosError'
import axios from '@/lib/axios'
import { actionResponse } from '@/types/reponse'
import { OrganizationAll, OrganizationInfo } from '@/types/owner/organization'
import apiEndpoints from '@/config/apiEndpoints'
import { CreateOrgFormData } from '@/schemas/OwnerCreateOrgnization'
import { revalidatePath } from 'next/cache'
import { fillRoute, Routes } from '@/routes'

export async function getAllOrganization(): Promise<
  actionResponse<OrganizationAll[]>
> {
  try {
    const { data } = await axios.get(apiEndpoints.owner.org.getAllOrganization)
    return {
      data: data,
      error: null,
    }
  } catch (e) {
    return {
      data: [],
      error: CatchAxiosError(e),
    }
  }
}

export async function createOrganization(body: CreateOrgFormData) {
  try {
    await axios.post(apiEndpoints.owner.org.createOrganization, body)
    revalidatePath(fillRoute(Routes.OWNER_ORGANIZATION))
  } catch (e) {
    CatchAxiosError(e)
  }
}

export async function getOrganizationIfo(
  orgId: string,
): Promise<actionResponse<OrganizationInfo>> {
  try {
    const { data } = await axios.get(
      apiEndpoints.owner.org.getOrganizationInfo(orgId),
    )
    return {
      data: data,
      error: null,
    }
  } catch (e) {
    return {
      data: {
        border: [],
        name: '',
        createdAt: null,
        updatedAt: null,
      },
      error: CatchAxiosError(e),
    }
  }
}
