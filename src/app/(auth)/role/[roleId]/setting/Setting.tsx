'use client'
import ListRole from '@/app/(auth)/role/[roleId]/setting/ListRole'
import { RoleInfo, RoleManagementResponse } from '@/types/role'
import RoleSettings from '@/app/(auth)/role/[roleId]/setting/RoleSettings'
import { fillRoute, Routes } from '@/routes'
import { useRouter } from 'next/navigation'

interface SettingsProps {
  roleList: RoleInfo[]
  roleManageInfo: RoleManagementResponse
  roleId: string
  initialTab: string
}

export default function Settings({
  initialTab,
  roleId,
  roleManageInfo,
  roleList,
}: SettingsProps) {
  const router = useRouter()

  const handleRoleSelect = (roleId: string) => {
    router.replace(
      `${fillRoute(Routes.ROLE_SETTING, roleId)}?tab=${initialTab}`,
    )
  }

  const handleTabChange = (tab: string) => {
    router.replace(`${fillRoute(Routes.ROLE_SETTING, roleId)}?tab=${tab}`)
  }

  return (
    <>
      <ListRole
        roleId={roleId}
        handleRoleSelect={handleRoleSelect}
        data={roleList}
      />

      <RoleSettings
        roleId={roleId}
        activeTab={initialTab}
        setActiveTab={handleTabChange}
        data={roleManageInfo}
      />
    </>
  )
}
