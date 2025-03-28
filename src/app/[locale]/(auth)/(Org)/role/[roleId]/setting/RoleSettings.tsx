import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EditRoleNameForm } from '@/app/[locale]/(auth)/(Org)/role/[roleId]/setting/tabs/Display'
import { RolePermissionsForm } from '@/app/[locale]/(auth)/(Org)/role/[roleId]/setting/tabs/Permission'
import React from 'react'
import { useRoleSetting } from '@/context/RoleSettingContext'
import Member from '@/app/[locale]/(auth)/(Org)/role/[roleId]/setting/tabs/Member'

interface RoleSettingsProps {
  activeTab: string
  setActiveTab: (activeTab: string) => void
}

export default function RoleSettings({
  setActiveTab,
  activeTab,
}: RoleSettingsProps) {
  const { roleManageInfo, roleId } = useRoleSetting()
  return (
    <div className={'flex-1'}>
      <Card>
        <CardHeader>
          <CardTitle>
            EDIT ROLE — {roleManageInfo.roleInfo.roleName.toLocaleUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="display"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>
            <TabsContent value="display">
              <EditRoleNameForm
                roleId={roleId}
                initialRoleName={roleManageInfo.roleInfo.roleName}
              />
            </TabsContent>
            <TabsContent value="permissions">
              <RolePermissionsForm
                data={roleManageInfo.rolePermissions}
                roleId={roleId}
              />
            </TabsContent>
            <TabsContent value="members">
              <Member
                roleId={roleId}
                roleMembers={roleManageInfo.roleMembers}
                roleName={roleManageInfo.roleInfo.roleName}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
