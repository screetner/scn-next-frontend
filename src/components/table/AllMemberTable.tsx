'use client'

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Member } from '@/types/member'
import { AllOrgMemberColumn } from '@/components/table/columnDef/allOrgMemberColumn'
import TanStackDataTable from '@/components/TanStackDataTable'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'

interface AllMemberProps {
  data: Member[]
}

export default function AllMemberTable({ data }: AllMemberProps) {
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    columns: AllOrgMemberColumn(),
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const username = row.getValue('username') as string
      const email = row.getValue('email') as string
      const role = row.getValue('roleName') as string
      return (
        username.toLowerCase().includes(filterValue.toLowerCase()) ||
        email.toLowerCase().includes(filterValue.toLowerCase()) ||
        role.toLowerCase().includes(filterValue.toLowerCase())
      )
    },
  })

  return (
    <div>
      <div className="flex mb-2">
        <Input
          placeholder="Search members"
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
        />
      </div>
      <TanStackDataTable table={table} />
    </div>
  )
}
