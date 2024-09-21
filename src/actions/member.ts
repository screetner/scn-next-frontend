'use server'

import axios from '@/lib/axios'
import { RecentMember, TotalInvite } from '@/types/member'
import { actionResponse } from '@/types/reponse'
import { InviteFormData } from '@/schemas/InviteMemberSchema'
import { CatchAxiosError } from '@/utils/CatchAxiosError'

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

export const getTotalMembers = async (): Promise<actionResponse<number>> => {
  try {
    const { data } = await axios.get<number>('/dashboard/member')
    return { data, error: null }
  } catch (e) {
    return {
      data: 0,
      error: 'Failed to fetch total members. Please try again.',
    }
  }
}

export const getTotalInvitees = async (): Promise<
  actionResponse<TotalInvite>
> => {
  try {
    const { data } = await axios.get<TotalInvite>('/dashboard/invite')
    return { data, error: null }
  } catch (e) {
    return {
      data: { inviteTotal: 0, inviteActivate: 0 },
      error: 'Failed to fetch total invitees. Please try again.',
    }
  }
}

export const inviteMembers = async (body: InviteFormData): Promise<void> => {
  try {
    await axios.post('/member/invite', body)
  } catch (e) {
    CatchAxiosError(e)
  }
}
