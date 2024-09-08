'use client'
import React, { createContext } from 'react'
import { RoleInfo, RoleManagementResponse, RoleMember } from '@/types/role'

interface RoleSettingData {
  roleId: string
  roleList: RoleInfo[]
  roleManageInfo: RoleManagementResponse
  listOfUnRoleMembers: RoleMember[]
}

const RoleSettingContext = createContext<RoleSettingData | undefined>(undefined)

interface RoleSettingContextProps {
  children: React.ReactNode
  data: RoleSettingData
}

export const RoleSettingProvider = ({
  children,
  data,
}: RoleSettingContextProps) => {
  return (
    <RoleSettingContext.Provider value={data}>
      {children}
    </RoleSettingContext.Provider>
  )
}

export const useRoleSetting = () => {
  const context = React.useContext(RoleSettingContext)
  if (context === undefined) {
    throw new Error('useRoleSetting must be used within a RoleSettingProvider')
  }
  return context
}
