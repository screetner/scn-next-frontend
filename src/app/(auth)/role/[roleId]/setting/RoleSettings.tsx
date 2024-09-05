import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RoleManagementResponse } from '@/types/role'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EditRoleNameForm } from '@/app/(auth)/role/[roleId]/setting/tabs/Display'
import { RolePermissionsForm } from '@/app/(auth)/role/[roleId]/setting/tabs/Permission'
import MemberTable from '@/app/(auth)/role/[roleId]/setting/tabs/MemberTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearchMemberTable } from '@/hooks/useSearchMemberTable'

interface RoleSettingsProps {
  data: RoleManagementResponse
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
  const { membersList, setSearchValue, searchValue } = useSearchMemberTable(
    data.roleMembers,
  )

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>
          EDIT ROLE — {data.roleInfo.roleName.toLocaleUpperCase()}
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
              initialRoleName={data.roleInfo.roleName}
            />
          </TabsContent>
          <TabsContent value="permissions">
            <RolePermissionsForm data={data.rolePermissions} roleId={roleId} />
          </TabsContent>
          <TabsContent value="members">
            <div className={'flex space-x-4 mb-2'}>
              <Input
                placeholder={'Search members'}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />
              <Button>Add Member</Button>
            </div>
            <MemberTable members={membersList} roleId={roleId} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
