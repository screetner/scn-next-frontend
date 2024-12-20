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
import { createServerAction, ServerActionError } from '@/utils/action-utils'

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

export async function getRoleManagement(roleId: string){
  try {
    const { data } = await axios.get<RoleManagementResponse>(
      `${apiEndpoints.role.getRoleManagement(roleId)}`,
    )
    return data
  } catch (e) {
    CatchAxiosError(e)
  }
}

export const updateRoleName = createServerAction<void, [string, string]>(
  async (roleName, roleId) => {
    try {
      await axios.patch(`${apiEndpoints.role.updateRoleName}`, {
        roleId: roleId,
        newName: roleName,
      })
    } catch (e : any) {
      throw new ServerActionError(e.response?.data?.message);
    }
    revalidatePath(`${fillRoute(Routes.ROLE_SETTING, roleId)}?tab=display`)
  }
)

export const updateRolePermissions = createServerAction<void, [string, RolePermissions]>(
  async (roleId, permissions) => {
    try {
      await axios.put(`${apiEndpoints.role.updateRolePermissions}`, {
        roleId: roleId,
        permission: permissions,
      })
    } catch (e : any) {
      throw new ServerActionError(e.response?.data?.message);
    }
    revalidatePath(`${fillRoute(Routes.ROLE_SETTING, roleId)}?tab=permissions`)
  }
)

export const createRoleWithRedirect = createServerAction<void, []>(
  async () => {
    let newRoleId = ''
    try {
      const { data } = await axios.post<createRoleResponse>(
        `${apiEndpoints.role.createRole}`,
      )
      newRoleId = data.roleId
    } catch (e : any) {
      throw new ServerActionError(e.response?.data?.message);
    }
    revalidatePath(fillRoute(Routes.ROLE))
    redirect(`${fillRoute(Routes.ROLE_SETTING, newRoleId)}?tab=permissions`)
  }
)

export const assignRoleToMember = createServerAction<void, [BodyAssignRole]>(
  async (body) => {
    try{
      await axios.patch(`${apiEndpoints.role.assignRole}`, body);
    }catch(e : any){
      throw new ServerActionError(e.response?.data?.message);
    }
    revalidatePath(`${fillRoute(Routes.ROLE_SETTING, body.roleId)}?tab=members`);
  }
)

export const removeMemberFromRole = createServerAction<void, [string, string]>(
  async (roleId, userId) => {
    try{
      await axios.patch(`${apiEndpoints.role.unassignRole}`, { userId });
    }catch(e : any){
      throw new ServerActionError(e.response?.data?.message);
    }
    revalidatePath(`${fillRoute(Routes.ROLE_SETTING, roleId)}?tab=members`);
  }
);

export const deleteRoleFromOrg = createServerAction<void, [string, string]>(
  async (targetRoleId, currentRoleId) => {
    try{
      await axios.delete(`${apiEndpoints.role.deleteRole(targetRoleId)}`);
    }catch(e : any){
      throw new ServerActionError(e.response?.data?.message);
    }
    if (targetRoleId === currentRoleId) {
      redirect(fillRoute(Routes.ROLE));
    } else {
      revalidatePath(fillRoute(Routes.ROLE_SETTING, currentRoleId));
    }
  }
)