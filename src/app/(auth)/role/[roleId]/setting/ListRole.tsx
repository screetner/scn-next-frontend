import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { RoleManagementResponse } from '@/types/role'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import * as action from '@/actions'
import React, { useCallback } from 'react'
import { toast } from 'sonner'
import RoleMenu from '@/app/(auth)/role/[roleId]/setting/menu/RoleMenu'

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
  const onCreateRole = useCallback(() => {
    toast.promise(action.createRoleWithRedirect(), {
      loading: 'Creating role...',
      success: 'Role created successfully',
      error: 'Failed to create role',
    })
  }, [])

  return (
    <ScrollArea className="w-full xl:w-1/6">
      <Card className="p-2">
        <CardHeader>
          <form action={onCreateRole}>
            <Button className="w-full" variant="default">
              <Plus className="mr-2 h-4 w-4" /> Create Role
            </Button>
          </form>
        </CardHeader>
        <Separator className={'mt-2'} />
        {data.orgRole.map(role => (
          <div
            key={role.roleId}
            className={cn(
              'cursor-pointer mt-2 w-full px-4 py-2 text-left rounded flex justify-between items-center',
              roleId === role.roleId
                ? 'bg-secondary text-secondary-foreground'
                : 'hover:bg-gray-100',
            )}
            onClick={() => handleRoleSelect(role.roleId)}
          >
            <div>{role.roleName}</div>
            <RoleMenu roleId={role.roleId} />
          </div>
        ))}
      </Card>
    </ScrollArea>
  )
}
