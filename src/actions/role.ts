'use server'

import { CatchAxiosError } from '@/utils/CatchAxiosError'
import axios from '@/lib/axios'
import { fillRoute, Routes } from '@/routes'
import { revalidatePath } from 'next/cache'
import { RolePermissions } from '@/schemas/rolePermissions'
import {
  BodyAssignRole,
  createRoleResponse,
  RoleManagementResponse,
  RolesTable,
} from '@/types/role'
import apiEndpoints from '@/config/apiEndpoints'
import { redirect } from '@/i18n/routing'

export async function getRolesTable() {
  try {
    const { data } = await axios.get<RolesTable[]>(
      `${apiEndpoints.role.getRolesTable}`,
    )
    return data
  } catch (e) {
    CatchAxiosError(e)
    return []
  }
}

export async function getRoleManagement(roleId: string) {
  try {
    const { data } = await axios.get<RoleManagementResponse>(
      `${apiEndpoints.role.getRoleManagement(roleId)}`,
    )
    return data
  } catch (e) {
    CatchAxiosError(e)
  }
}

export async function updateRoleName(roleName: string, roleId: string) {
  try {
    await axios.patch(`${apiEndpoints.role.updateRoleName}`, {
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
    await axios.put(`${apiEndpoints.role.updateRolePermissions}`, {
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
    const { data } = await axios.post<createRoleResponse>(
      `${apiEndpoints.role.createRole}`,
    )
    newRoleId = data.roleId
  } catch (e) {
    CatchAxiosError(e)
  }
  revalidatePath(fillRoute(Routes.ROLE))
  redirect(`${fillRoute(Routes.ROLE_SETTING, newRoleId)}?tab=permissions`)
}

export async function assignRoleToMember(body: BodyAssignRole) {
  try {
    await axios.patch(`${apiEndpoints.role.assignRole}`, body)
  } catch (e) {
    CatchAxiosError(e)
  }
  revalidatePath(`${fillRoute(Routes.ROLE_SETTING, body.roleId)}?tab=members`)
}

export async function removeMemberFromRole(roleId: string, userId: string) {
  try {
    await axios.patch(`${apiEndpoints.role.unassignRole}`, {
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
    await axios.delete(`${apiEndpoints.role.deleteRole(targetRoleId)}`)
  } catch (e) {
    CatchAxiosError(e)
  }
  if (targetRoleId === currentRoleId) {
    redirect(fillRoute(Routes.ROLE))
  } else {
    revalidatePath(fillRoute(Routes.ROLE_SETTING, currentRoleId))
  }
}
