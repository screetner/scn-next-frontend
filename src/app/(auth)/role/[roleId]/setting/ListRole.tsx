import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, MoreVertical, Trash2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { RoleManagementResponse } from '@/types/role'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import * as action from '@/actions'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import React from 'react'
import { toast } from 'sonner'
import { useAlertDialog } from '@/context/AlertDialogContext'

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
  const { showAlert } = useAlertDialog()
  const onDeleteRole = async (e: React.MouseEvent, userId: string) => {
    e.stopPropagation()
    showAlert('Are you sure you want to delete this role?', () => {
      toast.promise(action.deleteRoleFromOrg(userId, roleId), {
        loading: 'Deleting role...',
        success: 'Role deleted successfully',
        error: 'Failed to delete role',
      })
    })
  }

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
            className={cn(
              'cursor-pointer mt-2 w-full px-4 py-2 text-left rounded flex justify-between items-center',
              roleId === role.roleId
                ? 'bg-secondary text-secondary-foreground'
                : 'hover:bg-gray-100',
            )}
            onClick={() => handleRoleSelect(role.roleId)}
          >
            <div>{role.roleName}</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={e => onDeleteRole(e, 'userId')} // Replace 'userId' with the actual user ID
                  >
                    <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                    <span>Delete Role</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </Card>
    </ScrollArea>
  )
}
