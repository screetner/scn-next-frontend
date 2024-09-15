'use client'
import { RolesTable } from '@/types/role'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { fillRoute, Routes } from '@/routes'
import * as action from '@/actions'
import { toast } from 'sonner'
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { roleTableColumn } from '@/app/(auth)/role/table/roleTableColumn'
import TanStackDataTable from '@/components/TanStackDataTable'

interface RoleTableProps {
  roles: RolesTable[]
}

export default function RoleTable({ roles }: RoleTableProps) {
  const router = useRouter()
  const [roleNameFilter, setRoleNameFilter] = useState<ColumnFiltersState>([])

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault()
    toast.promise(action.createRoleWithRedirect(), {
      loading: 'Creating role...',
      success: 'Role created successfully',
      error: 'Failed to create role',
    })
  }

  const onClickViewMembers = (e: React.MouseEvent, roleId: string) => {
    e.stopPropagation()
    router.push(`${fillRoute(Routes.ROLE_SETTING, roleId)}?tab=members`)
  }

  const onRowClick = (row: RolesTable) => {
    router.push(`${fillRoute(Routes.ROLE_SETTING, row.roleId)}?tab=display`)
  }

  const table = useReactTable({
    columns: roleTableColumn(onClickViewMembers),
    data: roles,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setRoleNameFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters: roleNameFilter,
    },
  })

  return (
    <>
      <div className="flex space-x-4 py-4">
        <Input
          placeholder="Search roles"
          value={
            (table.getColumn('roleName')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('roleName')?.setFilterValue(event.target.value)
          }
        />
        <form onSubmit={handleCreateRole}>
          <Button type="submit">Create Role</Button>
        </form>
      </div>
      <TanStackDataTable table={table} onRowClick={onRowClick} />
    </>
  )
}
