'use server'

import axios from '@/lib/axios'
import { RecentMember } from '@/types/member'
import { actionResponse } from '@/types/reponse'

export const getRecentMembers = async (
  limit: number,
): Promise<actionResponse<RecentMember>> => {
  try {
    const { data } = await axios.get<RecentMember>(
      `/member/recent?limit=${limit}`,
    )
    return { data, error: null }
  } catch (e) {
    return {
      data: [],
      error: 'Failed to fetch recent members. Please try again.',
    }
  }
}
