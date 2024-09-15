import { ColumnDef } from '@tanstack/table-core'
import { RolesTable } from '@/types/role'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { User } from 'lucide-react'
import React from 'react'

export const roleTableColumn = (
  onClickViewMembers: (e: React.MouseEvent, roleId: string) => void,
): ColumnDef<RolesTable>[] => [
  {
    accessorKey: 'roleName',
    header: 'Role Name',
  },
  {
    accessorKey: 'members',
    header: 'Members',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          {row.original.members}
          <Tooltip>
            <TooltipTrigger asChild>
              <User
                onClick={e => onClickViewMembers(e, row.original.roleId)}
                className="hover:cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent side={'right'}>
              <p>View Members</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )
    },
  },
]
