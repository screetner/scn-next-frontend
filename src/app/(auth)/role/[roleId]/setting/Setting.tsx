'use client'
import ListRole from '@/app/(auth)/role/[roleId]/setting/ListRole'
import { RoleManagementResponse } from '@/types/role'
import RoleSettings from '@/app/(auth)/role/[roleId]/setting/RoleSettings'
import { useState } from 'react'
import { fillRoute, Routes } from '@/routes'
import { useRouter } from 'next/navigation'

interface SettingsProps {
  data: RoleManagementResponse
  roleId: string
  initialTab: string
}

export default function Settings({ initialTab, roleId, data }: SettingsProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(initialTab)

  const handleRoleSelect = (roleId: string) => {
    router.push(`${fillRoute(Routes.ROLE_SETTING, roleId)}?tab=${activeTab}`)
  }

  return (
    <>
      <ListRole
        roleId={roleId}
        handleRoleSelect={handleRoleSelect}
        data={data}
      />

      {/* Role Details Panel */}
      <RoleSettings
        roleId={roleId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data={data}
      />
    </>
  )
}
