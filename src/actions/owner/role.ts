import axios from '@/lib/axios'
import { RolesTable } from '@/types/role'
import apiEndpoints from '@/config/apiEndpoints'
import { actionResponse } from '@/types/reponse'

export async function getRolesByOrgId(
  orgId: string,
): Promise<actionResponse<RolesTable[]>> {
  try {
    const { data } = await axios.get<RolesTable[]>(
      `${apiEndpoints.owner.role.getRolesByOrgId(orgId)}`,
    )
    return { data, error: null }
  } catch (e) {
    return {
      data: [],
      error: 'Failed to fetch roles. Please try again.',
    }
  }
}
