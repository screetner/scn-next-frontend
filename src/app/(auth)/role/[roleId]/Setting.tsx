'use client'
import ListRole from '@/app/(auth)/role/[roleId]/ListRole'
import { RolesTable } from '@/types/role'
import RoleSettings from '@/app/(auth)/role/[roleId]/RoleSettings'
import { useState } from 'react'
import { Routes } from '@/routes'
import { useRouter } from 'next/navigation'

interface SettingsProps {
  data: RolesTable[]
  roleId: string
  initialTab: string
}

export default function Settings({ initialTab, roleId, data }: SettingsProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(initialTab)

  const handleRoleSelect = (roleId: string) => {
    router.push(`${Routes.ROLE}/${roleId}?tab=${activeTab}`)
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
