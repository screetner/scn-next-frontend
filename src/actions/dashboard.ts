'use server'

import axios from '@/lib/axios'
import { CatchAxiosError } from '@/utils/CatchAxiosError'
import { AssetResponse } from '@/types/dashboard'
import apiEndpoints from '@/config/apiEndpoints'

export async function getAssets() {
  try {
    const { data } = await axios.get<AssetResponse>(
      `${apiEndpoints.dashboard.getAssets}`,
    )
    return data
  } catch (err) {
    CatchAxiosError(err)
  }
}
