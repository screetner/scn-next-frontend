'use client'

import TanStackDataTable from '@/components/TanStackDataTable'
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { OrgTableColumn } from '@/app/[locale]/(auth)/(Owner)/owner/organization/table/OrgTableColumn'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import DialogButton from '@/components/Button/DialogButton'
import CreateOrganizationDialog from '@/app/[locale]/(auth)/(Owner)/owner/organization/CreateOrgDialog'

export default function OrgTable() {
  const [orgNameFilter, setOrgNameFilter] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    columns: OrgTableColumn(),
    data: [
      {
        orgId: '1',
        orgName: 'Org 1',
        orgMembers: 10,
        orgAssets: 20,
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setOrgNameFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters: orgNameFilter,
    },
  })
  return (
    <>
      <div className="flex space-x-4 py-4">
        <Input
          placeholder={'Search Organization'}
          value={(table.getColumn('orgName')?.getFilterValue() as string) ?? ''}
          onChange={e => {
            table.getColumn('orgName')?.setFilterValue(e.target.value)
          }}
        />
        <DialogButton
          title={'Create new Organization'}
          icon={<Plus />}
          content={<CreateOrganizationDialog />}
          text={'Create Organization'}
        />
      </div>
      <TanStackDataTable table={table} />
    </>
  )
}
