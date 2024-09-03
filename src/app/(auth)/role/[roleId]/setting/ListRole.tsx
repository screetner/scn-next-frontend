import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { RoleManagementResponse } from '@/types/role'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ListRoleProps {
  data: RoleManagementResponse
  roleId: string
  handleRoleSelect: (roleId: string) => void
}

export default function ListRole({
  data,
  roleId,
  handleRoleSelect,
}: ListRoleProps) {
  return (
    <ScrollArea className="w-full xl:w-1/6">
      <Card className="p-2">
        <CardHeader>
          <Button className="w-full" variant="default">
            <Plus className="mr-2 h-4 w-4" /> New Role
          </Button>
        </CardHeader>
        <Separator className={'mt-2'} />
        {data.orgRole.map(role => (
          <div
            key={role.roleId}
            onClick={() => handleRoleSelect(role.roleId)}
            className={`cursor-pointer mt-2 w-full px-4 py-2 text-left rounded ${
              roleId === role.roleId
                ? 'bg-secondary text-secondary-foreground'
                : 'hover:bg-gray-100'
            }`}
          >
            {role.roleName}
          </div>
        ))}{' '}
      </Card>
    </ScrollArea>
  )
}
