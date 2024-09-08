'use server'

import { CatchAxiosError } from '@/utils/CatchAxiosError'
import axios from '@/lib/axios'
import { redirect } from 'next/navigation'
import { fillRoute, Routes } from '@/routes'
import { revalidatePath } from 'next/cache'
import { RolePermissions } from '@/schemas/rolePermissions'
import {
  BodyAssignRole,
  createRoleResponse,
  RoleManagementResponse,
  RoleMember,
  RolesTable,
} from '@/types/role'

export async function getRolesTable() {
  try {
    const { data } = await axios.get<RolesTable[]>(`/role`)
    return data
  } catch (e) {
    CatchAxiosError(e)
    return []
  }
}

export async function getRoleManagement(roleId: string) {
  try {
    const { data } = await axios.get<RoleManagementResponse>(`/role/${roleId}`)
    return data
  } catch (e) {
    CatchAxiosError(e)
  }
}

export async function getListOfUnRoleMembers() {
  try {
    const { data } = await axios.get<RoleMember[]>(`/role/unassigned`)
    return data
  } catch (e) {
    CatchAxiosError(e)
  }
}

export async function updateRoleName(roleName: string, roleId: string) {
  try {
    await axios.patch(`/role/update-role-name`, {
      roleId: roleId,
      newName: roleName,
    })
  } catch (e) {
    CatchAxiosError(e)
  }
  revalidatePath(`${fillRoute(Routes.ROLE_SETTING, roleId)}?tab=display`)
}

export async function updateRolePermissions(
  roleId: string,
  permissions: RolePermissions,
) {
  try {
    await axios.put(`/role/permission`, {
      roleId: roleId,
      permission: permissions,
    })
  } catch (e) {
    CatchAxiosError(e)
  }
  revalidatePath(`${fillRoute(Routes.ROLE_SETTING, roleId)}?tab=permissions`)
}

export async function createRoleWithRedirect() {
  let newRoleId = ''
  try {
    const { data } = await axios.post<createRoleResponse>(`/role/new-role`)
    newRoleId = data.roleId
  } catch (e) {
    CatchAxiosError(e)
  }
  revalidatePath(fillRoute(Routes.ROLE))
  redirect(`${fillRoute(Routes.ROLE_SETTING, newRoleId)}?tab=permissions`)
}

export async function assignRoleToMember(body: BodyAssignRole) {
  try {
    await axios.patch(`/role/assign-role`, body)
  } catch (e) {
    CatchAxiosError(e)
  }
  revalidatePath(`${fillRoute(Routes.ROLE_SETTING, body.roleId)}?tab=members`)
}

export async function removeMemberFromRole(roleId: string, userId: string) {
  try {
    await axios.patch(`/role/unassign-role`, {
      userId: userId,
    })
  } catch (e) {
    CatchAxiosError(e)
  }
  revalidatePath(`${fillRoute(Routes.ROLE_SETTING, roleId)}?tab=members`)
}

export async function deleteRoleFromOrg(
  targetRoleId: string,
  currentRoleId: string,
) {
  try {
    await axios.delete(`/role/remove/${targetRoleId}`)
  } catch (e) {
    CatchAxiosError(e)
  }
  if (targetRoleId === currentRoleId) {
    redirect(fillRoute(Routes.ROLE))
  } else {
    revalidatePath(fillRoute(Routes.ROLE_SETTING, currentRoleId))
  }
}
