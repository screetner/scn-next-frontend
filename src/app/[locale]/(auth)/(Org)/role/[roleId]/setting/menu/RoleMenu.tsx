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
import { useAlertDialog } from '@/context/AlertDialogContext'
import { deleteRoleFromOrg } from '@/actions/role'

interface RoleActionProps {
  currentRoleId: string
  targetRoleId: string
}

export default function RoleMenu({ currentRoleId,targetRoleId }: RoleActionProps) {
  const { showAlert } = useAlertDialog()

  const onDeleteRole = useCallback(
    async (e: React.MouseEvent, targetRoleId: string) => {
      e.stopPropagation()
      showAlert('Are you sure you want to delete this role?', () => {
        toast.promise(deleteRoleFromOrg(targetRoleId, currentRoleId), {
          loading: 'Deleting role...',
          success: 'Role deleted successfully',
          error: err => err.message || 'An unexpected error occurred',
        })
      })
    },
    [currentRoleId, showAlert],
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
          <DropdownMenuItem onClick={e => onDeleteRole(e, targetRoleId)}>
            <Trash2 className="mr-2 h-4 w-4 text-red-600" />
            <span>Delete Role</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
