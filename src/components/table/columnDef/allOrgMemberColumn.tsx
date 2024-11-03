import { Member } from '@/types/member'
import { ColumnDef } from '@tanstack/table-core'

export const AllOrgMemberColumn = (): ColumnDef<Member>[] => {
  return [
    {
      accessorKey: 'username',
      header: 'Username',
    },
    {
      accessorKey: 'roleName',
      header: 'Role',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
  ]
}
