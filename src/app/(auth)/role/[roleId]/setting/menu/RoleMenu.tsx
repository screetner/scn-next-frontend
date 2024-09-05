import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVertical, Trash2 } from 'lucide-react'
import React, { useCallback } from 'react'
import { toast } from 'sonner'
import * as action from '@/actions'
import { useAlertDialog } from '@/context/AlertDialogContext'

interface RoleActionProps {
  roleId: string
}

export default function RoleMenu({ roleId }: RoleActionProps) {
  const { showAlert } = useAlertDialog()

  const onDeleteRole = useCallback(
    async (e: React.MouseEvent, roleId: string) => {
      e.stopPropagation()
      showAlert('Are you sure you want to delete this role?', () => {
        toast.promise(action.deleteRoleFromOrg(roleId, roleId), {
          loading: 'Deleting role...',
          success: 'Role deleted successfully',
          error: 'Failed to delete role',
        })
      })
    },
    [showAlert],
  )

  return (
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
          <DropdownMenuItem onClick={e => onDeleteRole(e, roleId)}>
            <Trash2 className="mr-2 h-4 w-4 text-red-600" />
            <span>Delete Role</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
