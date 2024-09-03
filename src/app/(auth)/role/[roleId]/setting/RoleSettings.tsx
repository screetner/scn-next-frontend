import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockPermissions, RolesTable } from '@/types/role'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EditRoleNameForm } from '@/app/(auth)/role/[roleId]/setting/tabs/Display'
import { RolePermissionsForm } from '@/app/(auth)/role/[roleId]/setting/tabs/Permission'

interface RoleSettingsProps {
  data: RolesTable[]
  roleId: string
  activeTab: string
  setActiveTab: (activeTab: string) => void
}

export default function RoleSettings({
  data,
  roleId,
  setActiveTab,
  activeTab,
}: RoleSettingsProps) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>
          EDIT ROLE —{' '}
          {data.find(role => role.id === roleId)?.roleName.toLocaleUpperCase()}
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
            <EditRoleNameForm roleId={roleId} initialRoleName={'test'} />
          </TabsContent>
          <TabsContent value="permissions">
            <RolePermissionsForm data={mockPermissions} />
          </TabsContent>
          <TabsContent value="members">
            <p>Manage members assigned to this role.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
