'use client'
import ListRole from '@/app/(auth)/role/[roleId]/setting/ListRole'
import RoleSettings from '@/app/(auth)/role/[roleId]/setting/RoleSettings'
import { fillRoute, Routes } from '@/routes'
import { useRouter } from 'next/navigation'
import { useRoleSetting } from '@/context/RoleSettingContext'

interface SettingsProps {
  initialTab: string
}

export default function Settings({ initialTab }: SettingsProps) {
  const router = useRouter()
  const { roleId } = useRoleSetting()

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
      <ListRole handleRoleSelect={handleRoleSelect} />

      <RoleSettings activeTab={initialTab} setActiveTab={handleTabChange} />
    </>
  )
}
