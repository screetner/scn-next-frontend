'use client'
import ListRole from '@/app/[locale]/(auth)/(Org)/role/[roleId]/setting/ListRole'
import RoleSettings from '@/app/[locale]/(auth)/(Org)/role/[roleId]/setting/RoleSettings'
import { fillRoute, Routes } from '@/routes'
import { useRoleSetting } from '@/context/RoleSettingContext'
import { useRouter } from '@/i18n/routing'

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
      <div className={'flex flex-col md:flex-row gap-4'}>
        <ListRole handleRoleSelect={handleRoleSelect} />
        <RoleSettings activeTab={initialTab} setActiveTab={handleTabChange} />
      </div>
    </>
  )
}
