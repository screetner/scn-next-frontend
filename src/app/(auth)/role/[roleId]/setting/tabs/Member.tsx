import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { RoleMember } from '@/types/role'
import { useDialog } from '@/context/DialogProvider'
import AddMemberDialog from '@/app/(auth)/role/[roleId]/setting/dialogs/AddMemberDialog'
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { MemberTableColumn } from '@/app/(auth)/role/[roleId]/setting/tables/memberTableColumn'
import TanStackDataTable from '@/components/TanStackDataTable'

interface MemberProps {
  roleId: string
  roleName: string
  roleMembers: RoleMember[]
}

export default function Member({ roleMembers, roleId, roleName }: MemberProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const { showDialog } = useDialog()

  const table = useReactTable({
    columns: MemberTableColumn({ roleId }),
    data: roleMembers,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const username = row.getValue('username') as string
      const email = row.getValue('email') as string
      return (
        username.toLowerCase().includes(filterValue.toLowerCase()) ||
        email.toLowerCase().includes(filterValue.toLowerCase())
      )
    },
  })

  return (
    <>
      <div className="flex space-x-4 mb-2">
        <Input
          placeholder="Search members"
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
        />
        <Button
          variant="default"
          disabled={roleName.toLowerCase() === 'default'}
          onClick={() =>
            showDialog({
              title: 'Add Member',
              content: <AddMemberDialog roleId={roleId} />,
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>
      <TanStackDataTable table={table} />
    </>
  )
}
