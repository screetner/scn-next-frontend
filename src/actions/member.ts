'use server'

import axios from '@/lib/axios'
import {
  InviteList,
  RecentMember,
  TotalInvite,
  TotalMember,
} from '@/types/member'
import { actionResponse } from '@/types/reponse'
import { InviteFormData } from '@/schemas/InviteMemberSchema'
import apiEndpoints from '@/config/apiEndpoints'
import { createServerAction, ServerActionError } from '@/utils/action-utils'
import { revalidatePath } from 'next/cache'

export const getRecentMembers = async (
  limit: number,
): Promise<actionResponse<RecentMember>> => {
  try {
    const { data } = await axios.get<RecentMember>(
      `${apiEndpoints.member.getRecentMembers(limit)}`,
    )
    return { data, error: null }
  } catch (e) {
    return {
      data: [],
      error: 'Failed to fetch recent members. Please try again.',
    }
  }
}

export const getTotalMembers = async (): Promise<
  actionResponse<TotalMember>
> => {
  try {
    const { data } = await axios.get<TotalMember>(
      `${apiEndpoints.member.getTotalMembers}`,
    )
    return { data, error: null }
  } catch (e) {
    return {
      data: { allMembers: 0, percentageIncrease: 0 },
      error: 'Failed to fetch total members. Please try again.',
    }
  }
}

export const getTotalInvitees = async (): Promise<
  actionResponse<TotalInvite>
> => {
  try {
    const { data } = await axios.get<TotalInvite>(
      `${apiEndpoints.member.getTotalInvitees}`,
    )
    return { data, error: null }
  } catch (e) {
    return {
      data: { inviteTotal: 0, inviteActivate: 0 },
      error: 'Failed to fetch total invitees. Please try again.',
    }
  }
}

export const getTotalAdmins = async (): Promise<actionResponse<number>> => {
  try {
    const { data } = await axios.get<number>(
      `${apiEndpoints.member.getTotalAdmins}`,
    )
    return { data, error: null }
  } catch (e) {
    return {
      data: 0,
      error: 'Failed to fetch total admins. Please try again.',
    }
  }
}

export const inviteMembers = createServerAction<void, [InviteFormData]>(
  async body => {
    try {
      await axios.post(`${apiEndpoints.member.inviteMembers}`, body)
      revalidatePath('/member')
    } catch (e: any) {
      throw new ServerActionError(e.response?.data?.message)
    }
  },
)

export const inviteList = async (): Promise<actionResponse<InviteList[]>> => {
  try {
    const { data } = await axios.get(`${apiEndpoints.member.inviteList}`)
    return { data, error: null }
  } catch (e) {
    return {
      data: [],
      error: 'Failed to fetch invite list. Please try again.',
    }
  }
}
