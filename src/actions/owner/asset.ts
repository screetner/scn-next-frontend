'use server'

import apiEndpoints from '@/config/apiEndpoints'
import axios from '@/lib/axios'
import { ServerActionError } from '@/utils/action-utils'
import { revalidatePath } from 'next/cache'

export const deleteAsset = async (assetId: string) => {
  try {
    await axios.delete(`${apiEndpoints.owner.asset.deleteAsset(assetId)}`)
    revalidatePath('/dashboard')
  } catch (e: any) {
    throw new ServerActionError(
      e.response?.data?.message || 'Failed to delete asset',
    )
  }
}
