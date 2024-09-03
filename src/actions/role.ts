'use server'

import { CatchAxiosError } from '@/utils/CatchAxiosError'
import axios from '@/lib/axios'

export async function updateRoleName(roleName: string) {
  try {
    const { data } = await axios.put(`/roleName`, {
      roleName: roleName,
    })
    return data
  } catch (e) {
    CatchAxiosError(e)
  }
}
