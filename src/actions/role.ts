'use server'

import { CatchAxiosError } from '@/utils/CatchAxiosError'
import axios from '@/lib/axios'
import { redirect } from 'next/navigation'
import { fillRoute, Routes } from '@/routes'
import { revalidatePath } from 'next/cache'
import { RolePermissions } from '@/schemas/rolePermissions'

export async function getRolesTable() {
  try {
    //TODO : Add get roles table Endpoint
    const { data } = await axios.get(``)
    return data
  } catch (e) {
    CatchAxiosError(e)
  }
}

export async function getRoleManagement(roleId: string) {
  try {
    const { data } = await axios.get(``)
    return data
  } catch (e) {
    CatchAxiosError(e)
  }
}

export async function updateRoleName(roleName: string) {
  try {
    //TODO : Add update role name Endpoint
    const { data } = await axios.put(``, {
      roleName: roleName,
    })
    return data
  } catch (e) {
    CatchAxiosError(e)
  }
}

export async function updateRolePermissions(
  roleId: string,
  permissions: RolePermissions,
) {
  try {
    //TODO : Add update role permissions Endpoint
    await axios.put(``)
  } catch (e) {
    CatchAxiosError(e)
  }
  revalidatePath(`${fillRoute(Routes.ROLE_SETTING, roleId)}`)
}

export async function createRoleWithRedirect() {
  let newRoleId = ''
  try {
    //TODO : Add create role Endpoint
    const { data } = await axios.post(``)
    newRoleId = data.roleId
  } catch (e) {
    CatchAxiosError(e)
  }
  revalidatePath(fillRoute(Routes.ROLE))
  redirect(`${fillRoute(Routes.ROLE_SETTING, newRoleId)}?tab=permissions`)
}

export async function removeMemberFromRole(roleId: string, userId: string) {
  try {
    //TODO : Add remove member from role Endpoint
    await axios.delete(``)
  } catch (e) {
    console.log(e)
    CatchAxiosError(e)
  }
  revalidatePath(fillRoute(Routes.ROLE))
  revalidatePath(`${fillRoute(Routes.ROLE_SETTING, roleId)}`)
}

export async function deleteRoleFromOrg(
  targetRoleId: string,
  currentRoleId: string,
) {
  try {
    //TODO : Add delete role from org Endpoint
    await axios.delete(``)
  } catch (e) {
    CatchAxiosError(e)
  }
  if (targetRoleId === currentRoleId) {
    redirect(fillRoute(Routes.ROLE))
  } else {
    revalidatePath(fillRoute(Routes.ROLE_SETTING, currentRoleId))
  }
}
