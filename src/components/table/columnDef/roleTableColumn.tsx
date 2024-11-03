import { ColumnDef } from '@tanstack/table-core'
import { RolesTable } from '@/types/role'
import { User } from 'lucide-react'
import React from 'react'
import ToolTip from '@/components/ToolTip'

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
          <ToolTip content={'View MemberTable'}>
            <User
              onClick={e => onClickViewMembers(e, row.original.roleId)}
              className="hover:cursor-pointer"
            />
          </ToolTip>
        </div>
      )
    },
  },
]
