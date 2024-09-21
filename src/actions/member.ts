'use server'

import axios from '@/lib/axios'
import { RecentMember } from '@/types/member'

export const getRecentMembers = async (limit: number) => {
  try {
    const { data } = await axios.get<RecentMember>(
      `/member/recent?limit=${limit}`,
    )
    return data
  } catch (e) {
    return []
  }
}
