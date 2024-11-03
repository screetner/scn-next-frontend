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
import { removeMemberFromRole } from '@/actions/role'

interface MemberMenuProps {
  roleId: string
  userId: string
}

export default function MemberMenu({ roleId, userId }: MemberMenuProps) {
  const { showAlert } = useAlertDialog()

  const onDeleteMember = useCallback(
    async (userId: string) => {
      showAlert('Are you sure you want to delete this member?', () => {
        toast.promise(removeMemberFromRole(roleId, userId), {
          loading: 'Removing member...',
          success: 'RoleMemberTable removed successfully',
          error: err => err.message,
        })
      })
    },
    [roleId, showAlert],
  )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <form
            onSubmit={async e => {
              e.preventDefault()
              await onDeleteMember(userId)
            }}
          >
            <DropdownMenuItem
              onClick={() => onDeleteMember(userId)}
              className="w-full flex items-center"
            >
              <Trash2 className="mr-2 h-4 w-4 text-red-600" />
              <span>Delete Member</span>
            </DropdownMenuItem>
          </form>
          {/* Add more actions here */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
