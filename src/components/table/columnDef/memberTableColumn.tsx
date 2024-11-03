import { ColumnDef } from '@tanstack/table-core'
import { RoleMember } from '@/types/role'
import MemberMenu from '@/app/[locale]/(auth)/(Org)/role/[roleId]/setting/menu/memberMenu'
import React from 'react'

interface MemberTableColumnProps {
  roleId: string | undefined | null
}

export const MemberTableColumn = ({
  roleId,
}: MemberTableColumnProps): ColumnDef<RoleMember>[] => {
  return [
    {
      accessorKey: 'username',
      header: 'Username',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return <MemberMenu roleId={roleId!} userId={row.original.userId} />
      },
      enableHiding: !roleId,
    },
  ]
}
