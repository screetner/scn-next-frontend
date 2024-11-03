import axios from '@/lib/axios'
import apiEndpoints from '@/config/apiEndpoints'
import { Member } from '@/types/member'

export async function getMemberByOrgId(orgId: string) {
  try {
    const { data } = await axios.get<Member[]>(
      `${apiEndpoints.owner.member.getMemberByOrgId(orgId)}`,
    )
    return { data, error: null }
  } catch (e) {
    return {
      data: [],
      error: 'Failed to fetch members. Please try again.',
    }
  }
}
