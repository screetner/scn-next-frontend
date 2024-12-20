'use client'
import { RolesTable } from '@/types/role'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { fillRoute, Routes } from '@/routes'
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { roleTableColumn } from '@/components/table/columnDef/roleTableColumn'
import TanStackDataTable from '@/components/TanStackDataTable'
import { createRoleWithRedirect } from '@/actions/role'
import { useRouter } from '@/i18n/routing'
import { Plus } from 'lucide-react'
import FormButton from '@/components/Button/FormButton'
import { useTranslations } from 'next-intl'
import { withToastPromise } from '@/utils/toastPromise'

interface RoleTableProps {
  roles: RolesTable[]
  ownerView?: boolean
}

export default function RoleTable({
  roles,
  ownerView = false,
}: RoleTableProps) {
  const router = useRouter()
  const [roleNameFilter, setRoleNameFilter] = useState<ColumnFiltersState>([])
  const t = useTranslations('RolePage.RoleTable')

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault()
    await withToastPromise(createRoleWithRedirect, {
      loading: 'Creating role...',
      success: 'Role created successfully',
      error: err => err.message || 'Failed to create role',
    })
  }

  const onClickViewMembers = (e: React.MouseEvent, roleId: string) => {
    e.stopPropagation()
    router.push(`${fillRoute(Routes.ROLE_SETTING, roleId)}?tab=members`)
  }

  const onRowClick = (row: RolesTable) => {
    if (ownerView) return
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
      <div className="flex space-x-4 mb-2">
        <Input
          placeholder="Search roles"
          value={
            (table.getColumn('roleName')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('roleName')?.setFilterValue(event.target.value)
          }
        />
        {!ownerView && (
          <FormButton
            onSubmit={handleCreateRole}
            disabled={ownerView}
            icon={<Plus />}
            text={t('createRoleButton')}
          />
        )}
      </div>
      <TanStackDataTable table={table} onRowClick={onRowClick} />
    </>
  )
}
